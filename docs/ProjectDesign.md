#ProjectDesign
##Basic
###基础值
  - rem:10px
  - color:#5A5A5A
  
##TechStructure
###Frames
  - zepto
    Dom,移动事件
  - artTemplate
    模板
  - Bootstrap3
    页面样式渲染
  - less
    css样式编辑

##PageStructure

###mainFrame
  - Header
    + logo
    + 下载按钮     /appDownload
  - Nav
    + 比价搜索     /category
    + 省钱控       /saveMoney
    + 国内折扣     /localDiscount
    + 白菜价       /specialPrice
    + 海淘折扣     /abroadDiscount
    + 优惠券       /cupons
    + 查历史价     /historyPrice
    + 更多         /more
    + 凑单品       /pieceTogather
    + 口碑排行     /publicPraise
    + 商城导航     /brandsNav
    + 品牌大全     /brandsRankingList
  - products
    + productList  /productList
    + moreInfo     /saveMoney
    + rankingList  /brandsRankingList
  - footer
    + footerNav
      - login      /login
      - register   /register
      - backToTop  /top
    + info         /info
    
####category
  - header
  - sortList
    + sortName
    + sortDetails
  - footer
