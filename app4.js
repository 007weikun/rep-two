
//数据持久化 后端的数据库  本地写文件  localStorage

//json 字符串  '{"name":"name"}'

//json字符串

/*var str = '{"name":"name"}';  //需要把json字符串转成可被操作的对象

//JSON.parse(str);

var obj = {width："50px"}; //把对象转成json字符串

//JSON.stringify(obj);*/

//存 取
//存 键值对
//取  键

var store = function(namespace, data){
    if (data) {
        return localStorage.setItem(namespace, JSON.stringify(data));
    }

    var store = localStorage.getItem(namespace);
    return (store && JSON.parse(store)) || [];
}

//先通过store方法去获取

var KEY = 'yongsheng';

var list = store(KEY);


/*var list = [
    {

        title:"1",
        checked:false

    },
    {
        title:"2",
        checked:false
    },
    {
        title:"3",
        checked:true
    }
]*/

//通过vue渲染数据

new Vue({
    el:".todoapp",
    data:{
        list:list,
        editorTodo:'',  //是否正在编辑某一条信息
        beforeEditing:''
    },
    watch:{
        list:{
            handler:function (newValue){
               store(KEY,newValue);        
            },
            deep:true
        }
    },
    methods:{
        addItem(ev){
            var val = ev.target.value.trim();
            if( !val ) return;
            this.list.push({
                title:val,
                checked:false
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

