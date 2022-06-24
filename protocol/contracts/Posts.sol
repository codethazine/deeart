// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/IERC1155MetadataURI.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165.sol";
import "@openzeppelin/contracts/utils/introspection/IERC165.sol";

contract Posts is Ownable, ERC165, IERC1155, IERC1155MetadataURI {
    using Address for address;

    event MintRequest(
        address indexed requestor,
        string id,
        address paymentToken
    );

    struct MintParams {
        string id;
        string ipns;
        address paymentToken;
        address receiver;
        address seller;
        uint256 amountToSeller;
        address feesCollector;
        uint256 amountToFeesCollector;
    }

    // Mapping from token ID to account balances
    mapping(uint256 => mapping(address => uint256)) internal _balances;

    // Mapping from account to operator approvals
    mapping(address => mapping(address => bool)) internal _operatorApprovals;

    // track token amounts supplied by account - address(0) is NATIVE coin
    mapping(address => mapping(address => uint256)) internal _supplied;
    // counter
    uint256 internal nextId;
    // IPNS address for each NFT
    mapping(uint256 => string) internal _ipnsAddress;
    // keep track of which IPNS address already have a NFT
    enum MintStatus {
        AVAILABLE,
        PENDING,
        MINTED
    }
    mapping(string => MintStatus) internal _status;

    string internal _uri;

    constructor(string memory baseUri_) {
        _uri = baseUri_;
    }

    function uri(uint256 id) public view override returns (string memory) {
        return string(bytes.concat(bytes(_uri), bytes(_ipnsAddress[id])));
    }

    /**
     * @notice Getter for the amount of `asset` supplied by `account`
     */
    function supplied(address account, address asset)
        public
        view
        returns (uint256)
    {
        return _supplied[account][asset];
    }

    /**
     * @notice Pull supplied assets
     */
    function withdraw(address asset, uint256 amount) public {
        require(
            _supplied[_msgSender()][asset] >= amount,
            "Posts: Pulling too much"
        );
        if (asset == address(0)) {
            Address.sendValue(payable(_msgSender()), amount);
        } else {
            IERC20(asset).transfer(_msgSender(), amount);
        }
        _supplied[_msgSender()][asset] -= amount;
    }

    /**
     * @notice request minting with NATIVE coin payment
     */
    function requestMintNative(string calldata id) public payable {
        _handleRequestMint(id, address(0), msg.value);
    }

    /**
     * @notice request minting with ERC20 payment
     */
    function requestMint(
        string calldata id,
        address paymentToken,
        uint256 amount
    ) public {
        IERC20(paymentToken).transferFrom(_msgSender(), address(this), amount);
        _handleRequestMint(id, paymentToken, amount);
    }

    /**
     * @notice Mint a post
     * @param params - MintParams
     */
    function mint(MintParams calldata params) public onlyOwner {
        _handleMint(params);
    }

    /**
     * @notice Batch mint posts
     * @param params - List of MintParams
     */
    function batchMint(MintParams[] calldata params) public onlyOwner {
        uint256 loops = params.length;
        for (uint256 i; i < loops; ++i) {
            _handleMint(params[i]);
        }
    }

    function balanceOf(address account, uint256 id)
        public
        view
        override
        returns (uint256)
    {
        require(
            account != address(0),
            "Posts: balance query for the zero address"
        );
        return _balances[id][account];
    }

    function balanceOfBatch(address[] memory accounts, uint256[] memory ids)
        public
        view
        override
        returns (uint256[] memory)
    {
        require(
            accounts.length == ids.length,
            "Posts: accounts and ids length mismatch"
        );

        uint256[] memory batchBalances = new uint256[](accounts.length);

        for (uint256 i = 0; i < accounts.length; ++i) {
            batchBalances[i] = balanceOf(accounts[i], ids[i]);
        }

        return batchBalances;
    }

    function setApprovalForAll(address operator, bool approved)
        public
        virtual
        override
    {
        _setApprovalForAll(_msgSender(), operator, approved);
    }

    function isApprovedForAll(address account, address operator)
        public
        view
        virtual
        override
        returns (bool)
    {
        return _operatorApprovals[account][operator];
    }

    /**
     * @dev If `to` is a contract it must inherit from IERC1155Receiver
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public virtual override {
        require(
            from == _msgSender() || isApprovedForAll(from, _msgSender()),
            "Posts: caller is not owner nor approved"
        );
        _safeTransferFrom(from, to, id, amount, data);
    }

    /**
     * @dev If `to` is a contract it must inherit from IERC1155Receiver
     */
    function safeBatchTransferFrom(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public override {
        require(
            from == _msgSender() || isApprovedForAll(from, _msgSender()),
            "Posts: transfer caller is not owner nor approved"
        );
        _safeBatchTransferFrom(from, to, ids, amounts, data);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC165, IERC165)
        returns (bool)
    {
        return
            interfaceId == type(IERC1155).interfaceId ||
            interfaceId == type(IERC1155MetadataURI).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    /*** INTERNAL FUNCTIONS ***/
    function _safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) internal {
        require(to != address(0), "Posts: transfer to the zero address");

        address operator = _msgSender();

        uint256 fromBalance = _balances[id][from];
        require(
            fromBalance >= amount,
            "Posts: insufficient balance for transfer"
        );
        unchecked {
            _balances[id][from] = fromBalance - amount;
        }
        _balances[id][to] += amount;

        emit TransferSingle(operator, from, to, id, amount);

        _doSafeTransferAcceptanceCheck(operator, from, to, id, amount, data);
    }

    function _safeBatchTransferFrom(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal virtual {
        require(
            ids.length == amounts.length,
            "Posts: ids and amounts length mismatch"
        );
        require(to != address(0), "Posts: transfer to the zero address");

        address operator = _msgSender();

        for (uint256 i = 0; i < ids.length; ++i) {
            uint256 id = ids[i];
            uint256 amount = amounts[i];

            uint256 fromBalance = _balances[id][from];
            require(
                fromBalance >= amount,
                "Posts: insufficient balance for transfer"
            );
            unchecked {
                _balances[id][from] = fromBalance - amount;
            }
            _balances[id][to] += amount;
        }

        emit TransferBatch(operator, from, to, ids, amounts);

        _doSafeBatchTransferAcceptanceCheck(
            operator,
            from,
            to,
            ids,
            amounts,
            data
        );
    }

    function _setApprovalForAll(
        address owner,
        address operator,
        bool approved
    ) internal {
        require(owner != operator, "Posts: setting approval status for self");
        _operatorApprovals[owner][operator] = approved;
        emit ApprovalForAll(owner, operator, approved);
    }

    function _doSafeTransferAcceptanceCheck(
        address operator,
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) private {
        if (to.isContract()) {
            try
                IERC1155Receiver(to).onERC1155Received(
                    operator,
                    from,
                    id,
                    amount,
                    data
                )
            returns (bytes4 response) {
                if (response != IERC1155Receiver.onERC1155Received.selector) {
                    revert("Posts: ERC1155Receiver rejected tokens");
                }
            } catch Error(string memory reason) {
                revert(reason);
            } catch {
                revert("Posts: transfer to non ERC1155Receiver implementer");
            }
        }
    }

    function _doSafeBatchTransferAcceptanceCheck(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) private {
        if (to.isContract()) {
            try
                IERC1155Receiver(to).onERC1155BatchReceived(
                    operator,
                    from,
                    ids,
                    amounts,
                    data
                )
            returns (bytes4 response) {
                if (
                    response != IERC1155Receiver.onERC1155BatchReceived.selector
                ) {
                    revert("Posts: ERC1155Receiver rejected tokens");
                }
            } catch Error(string memory reason) {
                revert(reason);
            } catch {
                revert("Posts: transfer to non ERC1155Receiver implementer");
            }
        }
    }

    function _handleRequestMint(
        string calldata id,
        address paymentToken,
        uint256 amount
    ) internal {
        require(_status[id] == MintStatus.AVAILABLE, "Posts: Not Available");
        _supplied[_msgSender()][paymentToken] += amount;
        _status[id] = MintStatus.PENDING;
        emit MintRequest(_msgSender(), id, paymentToken);
    }

    /**
     * @notice Internal function to handle minting
     */
    function _handleMint(MintParams calldata params) internal {
        require(_status[params.id] == MintStatus.PENDING, "Posts: Not Pending");

        if (
            _supplied[params.receiver][params.paymentToken] >=
            params.amountToSeller + params.amountToFeesCollector
        ) {
            if (params.paymentToken == address(0)) {
                Address.sendValue(
                    payable(params.seller),
                    params.amountToSeller
                );
                Address.sendValue(
                    payable(params.feesCollector),
                    params.amountToFeesCollector
                );
            } else {
                IERC20 token = IERC20(params.paymentToken);
                token.transfer(params.seller, params.amountToSeller);
                token.transfer(
                    params.feesCollector,
                    params.amountToFeesCollector
                );
            }
            _ipnsAddress[nextId] = params.ipns;
            _mint(params.receiver, nextId, 1, "");
            _status[params.id] = MintStatus.MINTED;
            nextId++;
        } else {
            _status[params.id] = MintStatus.AVAILABLE;
        }
    }

    function _mint(
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) internal {
        require(to != address(0), "Posts: mint to the zero address");

        address operator = _msgSender();

        _balances[id][to] += amount;
        emit TransferSingle(operator, address(0), to, id, amount);

        _doSafeTransferAcceptanceCheck(
            operator,
            address(0),
            to,
            id,
            amount,
            data
        );
    }
}
