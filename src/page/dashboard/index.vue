<!-- <template>
  <div>
    <div style="margin: 20px"><el-button @click="exportExcel">导出</el-button></div>
    <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
      <el-table-column
          type="selection"
          width="55">
      </el-table-column>
      <el-table-column
          label="日期"
          width="120">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column
          prop="name"
          label="姓名"
          width="120">
      </el-table-column>
      <el-table-column
          prop="address"
          label="地址"
          show-overflow-tooltip>
      </el-table-column>
    </el-table>
    <div style="margin: 20px"><el-button @click="toggleSelection()">取消选择</el-button></div>

  </div>


</template>

<script>
export default {
  data() {
    return {
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-08',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      multipleSelection: []
    }
  },

  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },



    // // 列表选中数据下载
    // downloadExcel() {
    //   this.$confirm('确定下载列表文件?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning',
    //   })
    //       .then(() => {
    //         this.excelData = this.multipleSelection // multipleSelection是一个数组，存储表格中选择的行的数据。
    //         this.export2Excel()
    //       })
    //       .catch(() => {})
    // },

    //导出的方法
    exportExcel() {
      require.ensure([], () => {
        const { export_json_to_excel } = require('../../vendor/Export2Excel');//注意这个Export2Excel路径
        const tHeader = ['date', '姓名', '地址'];   // 上面设置Excel的表格第一行的标题
        const filterVal = ['date', 'name', 'address']; // 上面的index、nickName、name是tableData里对象的属性key值
        const list = this.multipleSelection;  //把要导出的数据tableData存到list
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, '列表excel');//最后一个是表名字
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    }
  }
}
</script>

<style>

</style>
 -->