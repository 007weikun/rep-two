
//数据驱动 先规划数据结构
//一条信息
/*{
    title:"我是第一条信息"   //字段
    checked:true | false      当前这条信息是否是选中状态
}*/

var list = [
    {

        title:"1",
        checked:true

    },
    {
        title:"2",
        checked:false
    },
    {
        title:"3",
        checked:true
    }
]

//通过vue渲染数据

new Vue({
    el:".todoapp",
    data:{
        list:list,
        editorTodo:'',  //是否正在编辑某一条信息
        beforeEditing:''
    },
    methods:{
        addItem(ev){
            var val = ev.target.value.trim();
            if( !val ) return;
            this.list.push({
                title:val
            });

            ev.target.value = '';
        },
        destroyItem(todo){
           //this.list.splice(index,1);
           this.list = this.list.filter(function (item){
                return item !== todo;
           })
        },
        editorItem(todo){
            this.beforeEditing = todo.title;  //当修改的时候，先记录一下
            this.editorTodo = todo;
        },
        editingOk(todo){
            var title = todo.title.trim();
            if( !todo.title ){
               this.destroyItem(todo);
            }
            this.editorTodo = '';
            this.beforeEditing = '';
        },
        editingCancel(todo){
            //当取消修改，title还是修改之前的值
            todo.title = this.beforeEditing;
            this.editorTodo = '';
        }
    },
    computed:{
        //没有选中的条数
        noSelectedLength:function (){
             return this.list.filter(function (item){
                    return !item.checked
             }).length;
        },
        selectedLength:function (){
             return this.list.filter(function (item){
                    return item.checked
             }).length;
        },
        isAllChecked:{
            get(){
                return this.list.filter(function (item){
                     return item.checked   
                }).length === this.list.length
            },
            set(value){
                //设置值的，所有的数据都要变成value这个值 true或false
                this.list.forEach(function (item){
                    item.checked = value;
                })
            }
        }
    }
})

