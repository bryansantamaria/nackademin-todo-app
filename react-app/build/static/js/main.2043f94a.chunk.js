(this["webpackJsonpnackademin-todo-app"]=this["webpackJsonpnackademin-todo-app"]||[]).push([[0],{19:function(t,e,n){t.exports=n(42)},41:function(t,e,n){},42:function(t,e,n){"use strict";n.r(e);var a=n(0),o=n.n(a),r=n(16),c=n.n(r),l=n(18),u=n(2),i=n(3),s=n(5),p=n(4),d=n(6),m=n.n(d),h=(n(41),n(17)),f=function(t){Object(s.a)(n,t);var e=Object(p.a)(n);function n(){var t;Object(u.a)(this,n);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(t=e.call.apply(e,[this].concat(o))).state={title:""},t.onSubmit=function(e){e.preventDefault(),t.props.createToDo(t.state.title),t.setState({title:""})},t.onChange=function(e){t.setState(Object(h.a)({},e.target.name,e.target.value))},t}return Object(i.a)(n,[{key:"render",value:function(){return o.a.createElement("form",{onSubmit:this.onSubmit},o.a.createElement("input",{type:"text",name:"title",value:this.state.title,onChange:this.onChange,placeholder:"Add to do..."}),o.a.createElement("input",{type:"submit",value:"Submit",className:"submitBtn"}))}}]),n}(a.Component),b=function(t){Object(s.a)(n,t);var e=Object(p.a)(n);function n(){var t;Object(u.a)(this,n);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(t=e.call.apply(e,[this].concat(o))).state={},t}return Object(i.a)(n,[{key:"render",value:function(){var t=this,e=this.props.todo,n=e.title,a=(e.done,e.created,e.lastUpdated,e._id);return o.a.createElement("li",{className:"toDoItem"},o.a.createElement("input",{type:"checkbox",onChange:function(){return t.props.completeToDo(a)}}),n," ",o.a.createElement("button",{type:"button",onClick:function(){return t.props.delete(a)}},"Delete"),o.a.createElement("button",{type:"button",onClick:function(){return t.props.update(a)}},"Edit"))}}]),n}(a.Component),v=function(t){Object(s.a)(n,t);var e=Object(p.a)(n);function n(){var t;Object(u.a)(this,n);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(t=e.call.apply(e,[this].concat(o))).state={},t}return Object(i.a)(n,[{key:"render",value:function(){var t=this;return o.a.createElement("div",{className:"toDoContainer"},o.a.createElement("ul",{className:"nobull"},this.props.todos.map((function(e){return o.a.createElement(b,{key:e._id,todo:e,completeToDo:t.props.complete,delete:t.props.delete,update:t.props.update})}))))}}]),n}(a.Component),E=function(t){Object(s.a)(n,t);var e=Object(p.a)(n);function n(t){var a;return Object(u.a)(this,n),(a=e.call(this,t)).createToDo=function(t){m.a.post("http://localhost:8080/todo/create",{title:t,done:!1}).then((function(t){return a.setState({todos:[].concat(Object(l.a)(a.state.todos),[t.data])})}))},a.complete=function(t){return console.log("Completed",t)},a.delete=function(t){return console.log("Deleted",t)},a.update=function(t){return console.log("Update",t)},a.state={todos:[]},a}return Object(i.a)(n,[{key:"componentDidMount",value:function(){var t=this;m.a.get("http://localhost:8080/todo").then((function(e){return t.setState({todos:e.data})}))}},{key:"render",value:function(){return console.log(this.state.todos),o.a.createElement("div",{className:"App"},o.a.createElement("header",{className:"App-header"},o.a.createElement(f,{createToDo:this.createToDo}),o.a.createElement(v,{todos:this.state.todos,completeToDo:this.complete,delete:this.delete,update:this.update}),o.a.createElement("p",null," But first I will focus on creating the BACKEND! :D")))}}]),n}(a.Component);c.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(E,null)),document.getElementById("root"))}},[[19,1,2]]]);
//# sourceMappingURL=main.2043f94a.chunk.js.map