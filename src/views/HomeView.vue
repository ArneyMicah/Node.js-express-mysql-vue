<style lang="scss" scoped>
    .home {
        width: 100vw;
        height: 100vh;
        background-color: #eee;

        .index {
            width: 1000px;
            height: auto;
            background-color: #fff;
            box-shadow: 0 0 3px #000;
            border-radius: 10px;
            padding: 10px;
            box-sizing: border-box;
            margin: auto;

            .search {
                display: flex;
                align-items: center;
            }
        }
    }
</style>
<template>
    <div class="home">
        <div class="index">
            <div class="search">
                <el-input placeholder="请输入内容" v-model="search" @input="clear" class="input-with-select">
                    <el-button slot="append" @click="searchText" icon="el-icon-search"></el-button>
                </el-input>
                <el-button type="primary" @click="dialogVisible = true, title='添加用户'">添加用户</el-button>
            </div>
            <div class="table">
                <el-table :data="tableData" border style="width: 100%">
                    <el-table-column prop="id" label="ID" align="center">
                    </el-table-column>
                    <el-table-column prop="name" label="姓名" align="center">
                    </el-table-column>
                    <el-table-column prop="age" label="年龄" align="center">
                    </el-table-column>
                    <el-table-column prop="email" label="邮箱" align="center">
                    </el-table-column>
                    <el-table-column prop="mobile" label="电话" align="center">
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row.id)" type="danger" size="small">删除</el-button>
                            <el-button type="primary" @click="edituser(scope.row)" size="small">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="dialog">
            <el-dialog :title="title" :visible.sync="dialogVisible" width="40%">
                <el-form :model="ruleForm" label-width="70px" class="demo-ruleForm">
                    <el-form-item label="用户名">
                        <el-input v-model="ruleForm.username"></el-input>
                    </el-form-item>
                    <el-form-item label="年龄">
                        <el-input v-model="ruleForm.age"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <el-input v-model="ruleForm.email"></el-input>
                    </el-form-item>
                    <el-form-item label="电话">
                        <el-input v-model="ruleForm.mobile"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addDialogVisible">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import { getTable, addTableApi, deleteApi, searchApi, editApi } from '@/utils/api.js';
    import axios from 'axios';
    export default {
        data() {
            return {
                search: '',
                tableData: [],
                dialogVisible: false,
                title: '添加用户',
                ruleForm: {
                    username: '',
                    age: '',
                    email: '',
                    mobile: ''
                },
                editId: '',
            };
        },
        methods: {
            clear() {
                if(this.search === ""){
                    this.render()
                }
            },
            async searchText() {
                let res = await searchApi({ name: this.search });
                this.tableData = res.data
            },
            async render() {
                let res = await getTable()
                console.log(res);
                this.tableData = res.data
            },
            async addDialogVisible() {
                if (this.ruleForm.username === "") {
                    this.$message.error('用户名不能为空');
                    return false
                } else if (this.ruleForm.age === "") {
                    this.$message.error('年龄不能为空');
                    return false
                } else if (this.ruleForm.email === "") {
                    this.$message.error('邮箱不能为空');
                    return false
                } else if (this.ruleForm.mobile === "") {
                    this.$message.error('电话不能为空');
                    return false
                }
                if (this.title === '添加用户') {
                    let data = {
                        name: this.ruleForm.username,
                        age: Number(this.ruleForm.age),
                        email: this.ruleForm.email,
                        mobile: this.ruleForm.mobile
                    }
                    let res = await addTableApi(data)
                    console.log(res);
                    this.render()
                    this.dialogVisible = false
                    if (res.code === 200) {
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        });
                    }
                } else if (this.title === '编辑用户') {
                    let data = {
                        id: this.editId,
                        name: this.ruleForm.username,
                        age: Number(this.ruleForm.age),
                        email: this.ruleForm.email,
                        mobile: this.ruleForm.mobile
                    }
                    console.log(data);
                    let res = await editApi(data)
                    console.log(res);
                    this.render()
                    this.dialogVisible = false
                    if (res.code === 200) {
                        this.$message({
                            message: '编辑成功',
                            type: 'success'
                        });
                    }
                }
                this.ruleForm.username = ''
                this.ruleForm.age = ''
                this.ruleForm.email = ''
                this.ruleForm.mobile = ''
            },
            handleClick(id) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    let res = await deleteApi({ id: id })
                    console.log(res);
                    this.render()
                    if (res.code === 200) {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            edituser(item) {
                this.title = '编辑用户'
                this.dialogVisible = true
                this.editId = item.id
                this.ruleForm.username = item.name
                this.ruleForm.age = item.age
                this.ruleForm.email = item.email
                this.ruleForm.mobile = item.mobile
            }
        },
        created() {
            this.render()
        }
    };
</script>