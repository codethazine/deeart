const { expect } = require("chai");
const { constants, BigNumber } = require("ethers");
const { ethers } = require("hardhat");

describe("Posts", function () {
  before(async () => {
    this.signers = await ethers.getSigners()
    this.account0 = await this.signers[0].getAddress()
    this.account1 = await this.signers[1].getAddress()

    const Posts = await ethers.getContractFactory("Posts");
    this.posts = await Posts.deploy("http://localhost:3000/");
    await this.posts.deployed();
  })

  it("should allow to request minting with native coin", async () => {
    const tx = await this.posts.requestMintNative("000001", {
      value: constants.WeiPerEther
    });
    const receipt = await tx.wait()
    const event = receipt.events.find(el => el.event == 'MintRequest')
    expect(event).to.not.be.undefined
    expect(event.args.requestor).to.be.equal(this.account0)
    expect(event.args.ipns).to.be.equal('000001')
    expect(event.args.paymentToken).to.be.equal(constants.AddressZero)
    await this.posts.requestMintNative("000002", {
      value: constants.WeiPerEther
    })
    await this.posts.requestMintNative("000003", {
      value: constants.WeiPerEther
    })
  })

  it("should allow to request minting with an ERC20", async () => {

  })

  it("shold not allow minting by non owner accounts", async () => {
    const nonOwnerContract = this.posts.connect(this.signers[1])
    let errorMsg;
    try {
      await nonOwnerContract.mint([
        "000001",
        constants.AddressZero,
        this.account0,
        this.account1,
        constants.WeiPerEther.div(BigNumber.from('2')),
        this.account0,
        constants.WeiPerEther.div(BigNumber.from('2')),
      ])
    } catch (err) {
      errorMsg = err.toString()
    }
    expect(errorMsg.includes('caller is not the owner')).to.be.true;
  })

  it("Should allow minting by the owner", async () => {
    const mint = await this.posts.mint([
      "000001",
      constants.AddressZero,
      this.account0,
      this.account1,
      constants.WeiPerEther.div(BigNumber.from('2')),
      this.account0,
      constants.WeiPerEther.div(BigNumber.from('2')),
    ])

    const txReceipt = await mint.wait();
    const transferSingleEvent = txReceipt.events.find(el => el.event == 'TransferSingle')
    expect(transferSingleEvent.args.operator).to.equal(this.account0);
    expect(transferSingleEvent.args.from).to.equal(constants.AddressZero);
    expect(transferSingleEvent.args.to).to.equal(this.account0);
    expect(transferSingleEvent.args.id).to.equal(0);
    expect(transferSingleEvent.args.value).to.equal(BigNumber.from(1));
  });

  it("should not allow minting twice for the same IPNS address", async () => {
    let errorMsg;
    try {
      await this.posts.functions.mint([
        "000001",
        constants.AddressZero,
        this.account0,
        this.account1,
        constants.WeiPerEther.div(BigNumber.from('2')),
        this.account0,
        constants.WeiPerEther.div(BigNumber.from('2')),
      ])
    } catch (err) {
      errorMsg = err.toString()
    }

    expect(errorMsg.includes("Not Pending")).to.be.true;
  })

  it("should return the correct uri for the item", async () => {
    const uri = await this.posts.uri(0);
    expect(uri).to.be.equal("http://localhost:3000/000001");
  })

  it("should handle batch minting", async () => {
    const batchMint = await this.posts.batchMint([
      [
        "000002",
        constants.AddressZero,
        this.account0,
        this.account1,
        constants.WeiPerEther.div(BigNumber.from('2')),
        this.account0,
        constants.WeiPerEther.div(BigNumber.from('2')),
      ],
      [
        "000003",
        constants.AddressZero,
        this.account0,
        this.account1,
        constants.WeiPerEther.div(BigNumber.from('2')),
        this.account0,
        constants.WeiPerEther.div(BigNumber.from('2')),
      ],
    ]);
    const txReceipt = await batchMint.wait();
    // batchMint emits as many 'TransferSingle' events as tokens minted
    const transferSingleEvents = txReceipt.events.filter(el => el.event == 'TransferSingle')
    transferSingleEvents.map((event, index) => {
      expect(event.args.operator).to.equal(this.account0);
      expect(event.args.from).to.equal(constants.AddressZero);
      expect(event.args.to).to.equal(this.account0);
      expect(event.args.id).to.equal(index + 1); // we already minted 1 post earlier
      expect(event.args.value).to.equal(BigNumber.from(1));
    })

  })

});
