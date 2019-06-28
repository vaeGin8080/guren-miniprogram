<template>
    <div class="buy-card">
        <p class="tit">会员卡权益</p>
        <div class="cards">
            <van-icon name="arrow-left" />
            <swiper>
                <block v-for="(item, i) in cardList" :key="i">
                    <swiper-item>
                        <image :src="host + item.P_LImage" class="slide-image" width="355" height="150" mode="widthFix"/>
                        <p>{{ item.P_Name }}{{ item.P_MemberPrice }}</p>
                    </swiper-item>
                </block>
            </swiper>
            <van-icon name="arrow" />
        </div>
        <div class="desc">
            <wxParse :content="desc" @preview="preview" @navigate="navigate" :imageProp="imgObj"></wxParse>
        </div>
    </div>
</template>

<script>
import wxParse from 'mpvue-wxparse'
export default {
    data() {
        return {
            host: this.$host,
            cardList: [],
            desc: '',
            imgObj: {
                mode: "aspectFill",
                padding: 0,
                lazyLoad: true,
                domain: "www.51yst.cn"
            }
        }
    },
    methods: {
        getCardList() {
            let that = this
            let sendData = {
                action: "GetList",
                Column: '7067343',
		        DisplyObj: 'field',
                rows:'1000'
            }
            that.$fly.get("/GetSearchProduct.asp", sendData)
            .then(res => {
                that.cardList = res.rows
            })
        },
        getDesc() {
            let that = this
            that.$fly.get("/GetSearchColumn.asp", { action: "GetShow", C_ID: "7067343" })
            .then(res => {
                that.desc = res.C_Content
            })
        },
        preview(src, e) {
            console.log(e)
        },
        navigate(href, e) {
            console.log(href)
        }
    },
    onLoad() {
        this.getCardList()
        this.getDesc()
    },
    onShow() {
        wx.setNavigationBarTitle({
            title: '会员卡购买'
        })
    },
    components: {
        wxParse
    }
}
</script>
<style>
@import url("~mpvue-wxparse/src/wxParse.css");
.tit{
    color: #999;
    font-size: 28rpx;
    padding: 20rpx;
}
.cards{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.desc{
    padding: 30rpx;
}
swiper{
    width: 470rpx;
}
</style>

