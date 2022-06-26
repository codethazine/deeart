<template>
    <div style="padding: 30px 60px;">
        <h1>
            Test DeeArt
        </h1>
        <div style="display: flex; justify-content: space-between; flex-wrap: wrap; margin-top: 30px;">
            <div v-for="post in this.posts" :key="post.id" style="width: 22%; height: 500px;">
                <div class="card">
                    <div class="card-body">
                        <img class="card-img-top" :src="post.imageURL" alt="Card image cap">
                        <h5 style="margin-top: 10px;" class="card-title">{{post.id}}</h5>
                        <p class="card-text">MaticPrice: {{post.MaticPrice}}</p>
                        <a href="#" class="btn btn-primary">Mint</a>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>
<script>

export default {
    data() {
        return {
            posts: {
                0: {
                    id: 0,
                    igUsername: "test.deeartist",
                    igUniqueID: 53612203719,
                    MaticPrice: 0.2,
                    available: 1,
                    imageURL: "https://deeart8ec7eaf4aee54f558c184f4383a23c7a220431-dev.s3.amazonaws.com/public/a+cellphone+running+in+the+wild.png",
                    userID: 1,
                    walletAddress: "0xCA692Ab0c79C61AA1b0b3c0386FA0beb978AEF83"
                },
                1: {
                    id: 1,
                    igUsername: "test.deeartist",
                    igUniqueID: 53612203719,
                    MaticPrice: 0.2,
                    available: 1,
                    imageURL: "https://deeart8ec7eaf4aee54f558c184f4383a23c7a220431-dev.s3.amazonaws.com/public/a+computer+running+in+the+wild.png",
                    userID: 1,
                    walletAddress: "0xCA692Ab0c79C61AA1b0b3c0386FA0beb978AEF83"
                },
                2: {
                    id: 2,
                    igUsername: "test.deeartist",
                    igUniqueID: 53612203719,
                    MaticPrice: 0.2,
                    available: 1,
                    imageURL: "https://deeart8ec7eaf4aee54f558c184f4383a23c7a220431-dev.s3.amazonaws.com/public/a+fridge+running+in+the+wild.png",
                    userID: 1,
                    walletAddress: "0xCA692Ab0c79C61AA1b0b3c0386FA0beb978AEF83"
                },
                3: {
                    id: 3,
                    igUsername: "test.deeartist",
                    igUniqueID: 53612203719,
                    MaticPrice: 0.2,
                    available: 1,
                    imageURL: "https://deeart8ec7eaf4aee54f558c184f4383a23c7a220431-dev.s3.amazonaws.com/public/a+tobacco+leaf+running+in+the+wild.png",
                    userID: 1,
                    walletAddress: "0xCA692Ab0c79C61AA1b0b3c0386FA0beb978AEF83"
                },
                4: {
                    id: 4,
                    igUsername: "test.deeartist",
                    igUniqueID: 53612203719,
                    MaticPrice: 0.2,
                    available: 1,
                    imageURL: "https://deeart8ec7eaf4aee54f558c184f4383a23c7a220431-dev.s3.amazonaws.com/public/a+water+bottle+running+in+the+wild.png",
                    userID: 1,
                    walletAddress: "0xCA692Ab0c79C61AA1b0b3c0386FA0beb978AEF83"
                }
                
            }
        }
    },
}
</script>
