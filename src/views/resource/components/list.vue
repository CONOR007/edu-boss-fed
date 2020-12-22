<template>
  <div class="resource-list">
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <el-form ref="form" :model="form" label-width="80px">
            <el-form-item prop="name" label="资源名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item prop="url" label="资源路径">
                <el-input v-model="form.url"></el-input>
            </el-form-item>
            <el-form-item prop="categoryId" label="资源分类">
                <el-select
                v-model="form.categoryId"
                placeholder="请选择资源分类"
                clearable
                >
                <el-option
                    :label="item.name"
                    :value="item.id"
                    v-for="item in resourceCategories"
                    :key="item.id"
                ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button
                type="primary"
                @click="onSubmit"
                :disabled="isLoading"
                >查询搜索</el-button>
                <el-button
                @click="onReset('form')"
                :disabled="isLoading"
                >重置</el-button>
            </el-form-item>
            </el-form>
        </div>
        <el-table
            :data="resourceList.records"
            style="width: 100%; margin-bottom: 20px"
            v-loading="isLoading"
        >
            <el-table-column
            type="index"
            label="编号"
            width="100">
            </el-table-column>
            <el-table-column
            prop="name"
            label="资源名称"
            width="180">
            </el-table-column>
            <el-table-column
            prop="url"
            width="180"
            label="资源路径">
            </el-table-column>
            <el-table-column
            prop="description"
            width="180"
            label="描述">
            </el-table-column>
            <el-table-column
            width="180"
            prop="createdTime"
            label="添加时间">
            </el-table-column>
            <el-table-column
            width="180"
            label="操作">
            <template slot-scope="scope">
                <el-button
                size="mini"
                @click="handleEdit(scope.row)">编辑</el-button>
                <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row)">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
        <el-pagination
            :disabled="isLoading"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="resourceList.current || 1"
            :page-sizes="[5,10]"
            :page-size="resourceList.size || 5"
            layout="total, sizes, prev, pager, next, jumper"
            :total="resourceList.total || 0">
        </el-pagination>
        </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Form } from 'element-ui'
import { getResourcePages, getAllResourceType } from '@/services/resource'

export default Vue.extend({
    name: 'ResourceList',
    data () {
        return {
            isLoading: false,
            resourceList: {},
            resourceCategories: [],
            form: {
                name: '',
                url: '',
                current: 1, // 默认查询第1页数据
                size: 10, // 每页大小
                categoryId: null, // 资源分类
            },
        }
    },
    created () {
        this.loadResourcePages({})
        this.loadResourceType()
    },
    methods: {
        async loadResourcePages (params: any) {
            this.isLoading = true
            const { data } = await getResourcePages(params)
            this.resourceList = data.data
            this.isLoading = false
        },
        async loadResourceType () {
            const { data } = await getAllResourceType()
            this.resourceCategories = data.data
        },
        onSubmit () {
            this.loadResourcePages(this.form)
        },
        onReset (formName: string) {
            (this.$refs[formName] as Form).resetFields()
            this.form.current = 1
            this.form.size = 10
            this.onSubmit()
        },
        handleSizeChange (val: number) {
            this.form.size = val
            this.onSubmit()
        },
        handleCurrentChange (val: number) {
            this.form.current = val
            this.onSubmit()
        },
        handleEdit (formName: string) {
            (this.$refs[formName] as Form).validate((valid: boolean) => {
                if (valid) {
                    alert('submit!')
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        handleDelete (formName: string) {
            (this.$refs[formName] as Form).resetFields()
        },
    },
})
</script>

<style lang="scss" scoped></style>
