
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
        checked:true
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
        list:list
    },
    methods:{
        addItem(ev){
            this.list.push({
                title:ev.target.value
            });
        },
        destroyItem(todo){
           // this.list.splice(index,1);
           this.list = this.list.filter(function (item){
                return item !== todo;
           })
        }
    },
    computed:{
        isAllChecked:function (){  //取值的时候触发的 getter
            
            /*var n = 0;

            this.list.forEach(function (item){
                    if( item.checked ){
                        n++;
                    }
            });*/
            //return n === this.list.length;

            return this.list.filter(function (item){
                 return item.checked   
            }).length === this.list.length

            

        }
    }
})

