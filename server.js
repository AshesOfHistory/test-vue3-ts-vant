const express = require('express')

const app = express()

app.use(express.static('./dist'))

app.listen(8002, () => {
    console.log('test-vue3-ts-vant在800端口启动成功。')
})