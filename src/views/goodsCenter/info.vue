<template>
  <!-- 商品信息 -->
  <div class="p-10">
    <el-button type="primary" size="small" round @click="addClick">添加商品</el-button>
    <el-table :data="tableData" border stripe class="mt-10">
      <el-table-column label="序号" fixed width="50px" type="index" align="center">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品名" fixed align="center" min-width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.shopName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="图片" fixed align="center" min-width="100px">
        <template slot-scope="scope">
          <img v-for="(img,index) in scope.row.pic" :src="img" :key="index" class="img-style-small" alt="无图片" />
        </template>
      </el-table-column>
      <el-table-column label="所需积分" fixed align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.pricePoints}}</span>
        </template>
      </el-table-column>
      <el-table-column label="库存" align="center" min-width="130px">
        <template slot-scope="scope">
          <span>{{ scope.row.stock}}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center" min-width="180px">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status?'success':'danger'">{{scope.row.status?'上架':'下架'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="130px" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="editRow( scope.row.id )"></el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteRow( scope.row.id )"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="mt-10 text-r"
      background
      @size-change="getGoodsByPage"
      @current-change="getGoodsByPage"
      :current-page.sync="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size.sync="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 添加或编辑商品信息 -->
    <el-dialog :visible.sync="dialogVisible" title="请填写会员信息">
      <el-form label-position="right" label-width="140px" :model="dialogData" :rules="rules" ref="ruleForm">
        <el-form-item label="商品名：" prop="shopName">
          <el-input v-model="dialogData.shopName"></el-input>
        </el-form-item>
        <el-form-item label="所需积分：" prop="pricePoints">
          <el-input v-model="dialogData.pricePoints"></el-input>
        </el-form-item>
        <el-form-item label="库存:" prop="stock">
          <el-input v-model="dialogData.stock"></el-input>
        </el-form-item>
        <el-form-item label="状态:" prop="status">
          <el-select v-model="dialogData.status" placeholder="请选择" size="small">
            <el-option v-for="item in statusList" :key="item.value" :value="item.value" :label="item.desc"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备图片：">
          <el-upload
            enctype="multipart/form-data"
            ref="upload"
            :headers="headers"
            :auto-upload="false"
            :action="uploadActionUrl"
            multiple
            list-type="picture-card"
            :before-upload="beforeAvatarUpload"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-change="changePicture"
            :on-success="handleSuccessPicture"
            :on-error="handleErrorPicture"
            :file-list="fileList"
            :limit="5"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="imgDialogVisible" :modal-append-to-body="false" :modal="false">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-form-item>
        <div class="text-c">
          <el-button type="primary" size="medium" @click="submitClick">确定</el-button>
          <el-button type="info" size="medium" @click="cancel">取消</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getGoodsByPage, getGoodsById, addGoods, editGoods, deleteGoods } from '@/api/goodsCenter/info.js'
// import img1 from '@/assets/goods/1.jpg'
// import img2 from '../../assets/goods/2.jpg'

export default {
  data() {
    return {
      // img1,
      // table所有数据
      tableData: [
        // { id: 1, goodsName: '毛巾', goodsImg: img1, needPoints: 100, stock: 100, projectId: 1, status: '上架' },
        // { id: 2, goodsName: '纸巾', goodsImg: img2, needPoints: 300, stock: 100, projectId: 2, status: '下架' }
      ],
      // 编辑报警信息弹框显示
      dialogVisible: false,
      // 表格总数据条数
      total: 0,
      // 当前页
      currentPage: 1,
      // 一页显示多少条数据
      pageSize: 10,
      // 弹框回显报警信息数据
      dialogData: {},
      // 性别列表
      statusList: [{ value: true, desc: '上架' }, { value: false, desc: '下架' }],
      // 标记当前是编辑信息还是添加信息
      dialogAction: '',
      id: '',
      // 验证规则
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请选择姓名', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '电话不能为空', trigger: 'blur' }
        ],
        email: [
          { required: true, type: 'email', message: '请输入邮箱', trigger: 'blur' }
        ],
        sex: [
          { required: true }
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ],
        projectId: [
          { required: true, message: '请选择商品', trigger: 'blur' }
        ]
      },
      // 放大图片
      imgDialogVisible: false,
      // 放大图片
      dialogImageUrl: [],
      // 上传图片列表
      fileList: []
    }
  },
  computed: {
    // 授权头
    headers() {
      return {
        Authorization: this.$store.getters.authorization
      }
    },
    // upload组件上传图片的Action路由地址
    uploadActionUrl() {
      return process.env.VUE_APP_HTTP_MEMBER + '/Goods/_upload/' + this.id
    }
  },
  created() {
    this.getGoodsByPage()
  },
  methods: {
    // 分页
    getGoodsByPage() {
      getGoodsByPage(this.currentPage, this.pageSize).then(res => {
        this.tableData = res.list
        this.total = res.total
      }).catch(err => this.$message.error(err.toString()))
    },
    // 根据id查询商品信息
    getGoodsById(id) {
      getGoodsById(id).then(res => {
        this.dialogData = res
        this.id = this.dialogData.id
        if (!res.pic) this.fileList = []
        else {
          this.fileList = res.pic.map(item => {
            const tmp = item.split('/')
            const name = tmp.length > 0 ? tmp[tmp.length - 1] : '图片'
            return { name: name, url: item }
          })
        }
      }).catch(err => this.$message.error(err.toString()))
    },
    // 添加商品
    addGoods() {
      addGoods(this.dialogData).then(res => {
        this.id = res
        this.$nextTick(() => this.$refs.upload.submit())
        this.$message.success('添加成功')
        this.getGoodsByPage()
      }).catch(err => this.$message.error(err.toString()))
    },
    // 编辑商品
    editGoods() {
      // 获取保留的文件路径
      this.dialogData.pic = this.fileList.filter(item => item.status === 'success').map(item => item.url)
      editGoods(this.id, this.dialogData).then(res => {
        const waitForUpload = this.fileList.filter(item => item.status === 'ready')
        if (waitForUpload.length > 0) {
          // 在表单提交成功之后再上传文件
          this.$nextTick(() => this.$refs.upload.submit())
        } else {
          this.$message.success('修改成功')
          this.getGoodsByPage()
        }
      }).catch(err => this.$message.error(err.toString()))
    },
    // 删除商品
    deleteGoods(id) {
      deleteGoods(id).then(res => {
        this.$message.success('删除成功')
        this.getGoodsByPage()
      }).catch(err => this.$message.error(err.toString()))
    },
    // 分页
    // fetchData() {
    //  let tableData = this.tableData
    // if (this.projectId) tableData = tableData.filter(item => item.projectId === this.projectId)
    // this.currentTableData = tableData.slice(this.pageSize * (this.currentPage - 1), this.pageSize * this.currentPage)
    // this.total = this.currentTableData.length
    // },
    // 添加会员按钮
    addClick() {
      this.dialogVisible = true
      this.dialogAction = 'add'
      this.fileList = []
      this.dialogData = {}
    },
    // 编辑
    editRow(id) {
      this.dialogVisible = true
      this.dialogAction = 'edit'
      this.fileList = []
      this.getGoodsById(id)
      this.id = id
    },
    // 弹框的确定按钮
    submitClick() {
      this.dialogVisible = false
      // 验证
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          if (this.dialogAction === 'add') this.addGoods()
          else this.editGoods()
          this.dialogData = {}
        } else {
          this.$message.error('填写错误，添加失败')
          return false
        }
      })
    },
    // 弹框的取消按钮
    cancel() {
      this.dialogVisible = false
      this.dialogData = {}
    },
    deleteRow(id) {
      this.$confirm('此操作将删除该行, 是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => this.deleteGoods(id))
        .catch(() => this.$message.info('取消删除'))
    },
    // 页面操作----图片相关
    // 上传图片前的校验
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/bmp'
      const isLimit = file.size / 1024 / 1024 < 15
      if (!isJPG) {
        this.$message.error('上传图片只能是jpg、jpeg、png、gif、bmp格式!')
      }
      if (!isLimit) {
        this.$message.error('上传头像图片大小不能超过15MB!')
      }
      return isJPG && isLimit
    },
    // 删除图片事件,将filelist赋值,用来标识是否有图片
    handleRemove(file, fileList) {
      this.fileList = fileList
    },
    // 放大图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.imgDialogVisible = true
    },
    // 添加图片事件,将filelist赋值,用来标识是否有图片
    changePicture(file, fileList) {
      this.fileList = fileList
    },
    // 成功上传图片到服务器
    handleSuccessPicture(response, file, fileList) {
      if (fileList.length > 0 && fileList[fileList.length - 1].status === 'success') {
        this.getGoodsByPage()
        if (this.act === 'add') this.$message.success('添加成功')
        else this.$message.success('更新成功')
      }
    },
    // 上传图片失败
    handleErrorPicture(response, file, fileList) {
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
