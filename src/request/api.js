import {get,post} from "./http"

/**菜单开始**/
// 添加
export const reqmenuadd = (params)=>post("/api/menuadd",params)
// 修改
export const reqmenuedit = (params)=>post("/api/menuedit",params)
// 删除
export const reqmenudelete = (params)=>post("/api/menudelete",params)
// 列表
export const reqmenulist = (params)=>get("/api/menulist",params)
// 获取一条
export const reqmenuinfo = (params)=>get("/api/menuinfo",params)

/**菜单结束**/


/**角色开始**/
// 添加
export const reqroleadd = (params)=>post("/api/roleadd",params)
// 修改
export const reqroleedit = (params)=>post("/api/roleedit",params)
// 删除
export const reqroledelete = (params)=>post("/api/roledelete",params)
// 列表
export const reqrolelist = (params)=>get("/api/rolelist",params)
// 获取一条
export const reqroleinfo = (params)=>get("/api/roleinfo",params)

/**角色结束**/


/**管理员开始**/
// 添加
export const requseradd = (params)=>post("/api/useradd",params)
// 修改
export const requseredit = (params)=>post("/api/useredit",params)
// 删除
export const requserdelete = (params)=>post("/api/userdelete",params)
// 列表
export const requserlist = (params)=>get("/api/userlist",params)
// 获取一条
export const requserinfo = (params)=>get("/api/userinfo",params)
// 获取总数
export const requsercount =()=>get("/api/usercount")

// 管理员登录
export const requserlogin = (params)=>post("/api/userlogin",params)
/**管理员结束**/


/**会员开始**/

// 修改
export const reqmemberedit = (params)=>post("/api/memberedit",params)
// 列表
export const reqmemberlist = ()=>get("/api/memberlist")
// 获取一条
export const reqmemberinfo = (params)=>get("/api/memberinfo",params)

/**会员结束**/


/**商品分类开始**/

// 添加
export const reqcateadd = (params)=>post("/api/cateadd",params,true)
// 修改
export const reqcateedit = (params)=>post("/api/cateedit",params,true)
// 删除
export const reqcatedelete = (params)=>post("/api/catedelete",params)
// 列表
export const reqcatelist = (params)=>get("/api/catelist",params)
// 获取一条
export const reqcateinfo = (params)=>get("/api/cateinfo",params)

/**商品分类结束**/



/**商品规格开始**/
// 添加
export const reqspecsadd = (params)=>post("/api/specsadd",params)
// 修改
export const reqspecsedit = (params)=>post("/api/specsedit",params)
// 删除
export const reqspecsdelete = (params)=>post("/api/specsdelete",params)
// 列表
export const reqspecslist = (params)=>get("/api/specslist",params)
// 获取一条
export const reqspecsinfo = (params)=>get("/api/specsinfo",params)
// 获取总数
export const reqspecscount =()=>get("/api/specscount")

/**商品规格结束**/

