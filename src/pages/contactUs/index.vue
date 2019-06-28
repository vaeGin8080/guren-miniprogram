<template>
    <div class="contactUs">
        <wxParse :content="content" @preview="preview" @navigate="navigate" :imageProp="imgObj"></wxParse>
    </div>
</template>

<script>
import wxParse from 'mpvue-wxparse'
export default {
    data() {
        return {
            content: '',
            imgObj: {
                mode: "aspectFill",
                padding: 0,
                lazyLoad: true,
                domain: "www.51yst.cn"
            }
        }
    },
    methods: {
        getContactDetail() {
            let that = this
            that.$fly.get("/GetSearchColumn.asp", { action: "GetShow", C_ID: "3622" })
            .then(res => {
                that.content = res.C_Content
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
        this.getContactDetail()
    },
    onShow() {
        wx.setNavigationBarTitle({
            title: '联系我们'
        })
    },
    components: {
        wxParse
    }
}
</script>

<style>
@import url("~mpvue-wxparse/src/wxParse.css");
.contactUs{
    padding: 30rpx;
}
</style>

