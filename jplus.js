
// jplus is a javascript utiity framework that is written by sean freeman.
// feel free to use it, edit it, share it or do whatever you wanna do with it.
window.edebug=function(s){
    console.log(s);
};
window.ob = {
    b: document.body,
    d: document,
    w: window,
    removeattr: function (name) {
        this.list.forEach(function (ele) {
            ele.removeAttribute(name);
        });
    },
    setval: function (v) {
        this.list.forEach(function (ele) { ele.value = v; });
        return this;
    },

    getval: function (v) {
        return this.list[0].value;
    },

    c: function (fun, bool) {
        /// <summary>j("one").c(fun,bool);</summary>
        /// <param name="fun" type="Function">Pass in a function to be executed when something is clicked</param>
        /// <param name="bool" type="Boolean">Leave it if "false".</param>
        /// <returns type="ob" />
        bool = bool || false;
        if (fun) {
            this.list.forEach(function (ele) {
                ele.addEventListener("click", fun, bool);
            });
        }
        return this;
    },

    e: function (type, fun, bool) {
        /// <summary>add Events to selected elements j("one").e("click",fun, capture)</summary>
        /// <param name="type" type="String">Type of Events "click", "mousemove" etc</param>
        /// <param name="fun" type="Function">Function to be executed whenever event occures</param>
        /// <param name="bool" type="Boolean">Capture. is it a capture event or not. false is default. </param>
        /// <returns type="ob" />
        if (fun) {
            bool = bool || false;
            this.list.forEach(function (ele) { ele.addEventListener(type, fun, bool) });
        }
        return this;
    },

    mu: function (fun, bool) {
        /// <summary>MouseUp</summary>
        /// <param name="fun" type="Function">Function</param>
        /// <returns type="ob" />
        if (fun) {
            bool = bool || false;
            this.list.forEach(function (ele) {
                ele.addEventListener("mouseup", fun, bool);
            });
        }
        return this;
    },

    md: function (fun, bool) {
        /// <summary>MouseDown</summary>
        /// <param name="fun" type="Function">Function</param>
        /// <returns type="ob" />
        if (fun) {
            bool = bool || false;
            this.list.forEach(function (ele) {
                ele.addEventListener("mousedown", fun, bool);
            });
        }
        return this;
    },

    ku: function (fun, bool) {
        /// <summary>KeyUP</summary>
        /// <returns type="ob" />
        if (fun) {
            bool = bool || false;
            this.list.forEach(function (ele) {
                ele.addEventListener("keyup", fun, bool);
            });
        }
        return this;
    },

    kd: function (fun, bool) {
        /// <summary>KeyDown</summary>
        /// <returns type="ob" />
        if (fun) {
            bool = bool || false;
            this.list.forEach(function (ele) {
                ele.addEventListener("keydown", fun, bool);
            });
        }
        return this;
    },

    cm: function (fun, bool) {
        /// <summary>Right Click or ContextMenu: pass in a function to be executed whenever rightclicked.</summary>
        /// <returns type="ob" />
        if (fun) {
            // right click
            bool = bool || false;
            this.list.forEach(function (ele) {
                ele.addEventListener("contextmenu", fun, bool);
            });
        }
        return this;
    },

    s: function (object, value) {
        /// <summary>Style: change the style of any element</summary>
        /// <param type="null">if you pass in nothing, it returns style object for the first element in the list</param>
        /// <returns type="StyleObject" />
        /// <param name="object" type="Object">Pass in an object: ex: j("one").s({color:"red", width:"120px"}); </param>
        /// <param name="value" type="String">Passin two strings ex: j("one").s("color","red");</param>
        /// <returns type="ob" />
        if (value) {
            this.list.forEach(function (ele) {
                ele.style[object] = value;
            });
        }
        else if (object) {
            this.list.forEach(function (ele) {
                for (var i in object) {
                    ele.style[i] = object[i];
                }
            });
        }
        else {
            return this.list[0].style;
        }
        return this;
    },

    each: function (fun) {
        /// <summary>execute the function on every element from list</summary>
        /// <param name="fun" type="Function">j("one").each(function(ele){ele.style.color='red';});</param>
        /// <returns type="ob" />
        if (fun) {
            this.list.forEach(fun);

        }
        return this;
    },

   
    addchild: function (ele, where) {
        this.list.forEach(function (a) {
            if (where) {
                j(a).inserthtml("<div></div>", "afterbegin");
                a.replaceChild(ele, a.firstElementChild);
            }
            else {
                a.appendChild(ele);
            }

        });
        return this;
    },
    addchildhtml: function (html, where) {
        /// <summary>add child to any element anywhere. first or last</summary>
        /// <param  type="null">passs nothing appends child to that element at last and returns ob with it</param>
        /// <param name="html" type="String||document.element">pass in html to be added. you can also pass"element"</param>
        /// <param name="where" type="String">Say where you wanna addchild. first or last.</param>
        /// <returns type="ob" />
        if (!html) {
            this.list[0].appendChild(document.createElement("div"));
            var newob = Object.create(ob);
            newob.list = [];
            newob.list.push(this.list[0].lastElementChild);
            return newob;
        }

        else {

            if (typeof html !== 'string') {
                html = html.outerHTML;
            }

            if (where === 'first') {

                if (document.createElement('div').insertAdjacentHTML) {
                    this.list.forEach(function (ele) {
                        ele.insertAdjacentHTML("afterbegin", html);
                    });
                }
                else {
                    this.list.forEach(function (ele) {
                        ele.insertBefore(document.createElement('div'), ele.firstElementChild);
                        ele.firstElementChild.outerHTML = html;
                    });
                }

                return this;
            }
            else {
                this.list.forEach(function (ele) {
                    ele.appendChild(document.createElement('div'));
                    ele.lastElementChild.outerHTML = html;

                });
                return this;
            }
        }
    },

    inserthtml: function (html, where) {
        /// <summary>InsertAdjacentHtml: implements insertAdjacentHtml on all browsers</summary>
        /// <param name="html" type="String">Html to be inserted</param>
        /// <param name="where" type="String"> "beforebegin", "afterbegin", "beforeend", "afterend"</param>
        /// <returns type="ob" />

        var d = document;
        if (document.createElement('div').insertAdjacentHTML) {
            this.list.forEach(function (ele) {
                ele.insertAdjacentHTML(where, html);
            });
        }

        else {
            if (where === 'beforebegin') {

                this.list.forEach(function (ele) {
                    ele.parentElement.insertBefore(document.createElement('div'), ele);
                    ele.previousElementSibling.outerHTML = html;
                });
            }
            else if (where === 'afterbegin') {
                this.list.forEach(function (ele) {
                    ele.insertBefore(document.createElement('div'), ele.firstElementChild);
                    ele.firstElementChild.outerHTML = html;
                });
            }
            else if (where === 'beforeend') {
                this.list.forEach(function (ele) {
                    ele.appendChild(document.createElement("div"));
                    ele.lastElementChild.outerHTML = html;
                });
            }
            else if (where === 'afterend') {
                this.list.forEach(function (ele) {
                    j(ele).addsib(html, "after");
                });
            }

        }
        return this;
    },
    addsib: function (ele, where) {

        this.list.forEach(function (item) {
            j(item).addsibhtml("<div id='thisisj'></div>", where);
            j("thisisj").replacewith(ele);


        }); return this;
    },
    addsibhtml: function (html, where, sib) {
        /// <summary>Add sibling before or after any element</summary>
        /// <param name="html" type="String">Html or element to be inserted</param>
        /// <param name="where" type="String">before or after: default is "after" :D</param>
        /// <returns type="ob" />


        if (typeof html !== 'string') {
            html = html.outerHTML;
        }

        if (document.createElement('div').insertAdjacentElement) {
            if (where == 'before') {
                this.list.forEach(function (ele) {
                    ele.insertAdjacentHTML("beforebegin", html);
                });
            }
            else {
                this.list.forEach(function (ele) {
                    ele.insertAdjacentHTML("afterend", html);
                });
            }
        }
        else {
            if (where === 'before') {

                this.list.forEach(function (ele) {
                    ele.parentElement.insertBefore(document.createElement('div'), ele);
                    ele.previousElementSibling.outerHTML = html;
                });
            }
            else {
                this.list.forEach(function (ele) {
                    if (ele.nextElementSibling) {
                        ele.parentElement.insertBefore(document.createElement('div'), ele.nextElementSibling);
                        ele.nextElementSibling.outerHTML = html;

                    }
                    else {
                        ele.parentElement.appendChild(document.createElement("div"));
                        ele.nextElementSibling.outerHTML = html;
                    }

                });
            }

        }
        return this;
    },

    remove: function () {
        this.list.forEach(function (a) {
            a.parentElement.removeChild(a);
        });
    },

    isexist: function () {
        if (this.list[0]) { return true; }
        else { return false; }
    },

    replace: function (htmlornode) {
        /// <summary>Replace any element with another new element or html</summary>
        /// <param name="htmlornode" type="String">Pass in string of html</param>
        /// <param name="htmlornode" type="document.Element">pass in the element</param>
        /// <returns type="ob" />
        var newob = Object.create(ob);
        var list = [];
        if (typeof htmlornode !== 'string') {
            htmlornode = htmlornode.outerHTML;
        }
        this.list.forEach(function (ele) {
            var parent = ele.parentElement;
            if (ele.insertAdjacentHTML) {
                ele.insertAdjacentHTML("beforebegin", htmlornode);
            }

            else {
                parent.insertBefore(document.createElement("div"), ele);
                ele.previousElementSibling.outerHTML = htmlornode;
            }
            list.push(ele.previousElementSibling);
            parent.removeChild(ele);
        });
        newob.list = list;
        return newob;
    },

    replacewith: function (idorele) {
        //pass in the idof ele or ele directly to replace an element with another element. 
        //j("one").replacewith("asdf"); replace '#one' with existing element. 
        var newob = Object.create(ob);
        newob.list = [];
        //replacewith an existing element .
        if (typeof idorele === 'string') {
            idorele = document.getElementById(idorele);
        }
        if (!idorele) {
            return null;
        }
        // now idorele is an element
        this.list[0].parentElement.replaceChild(idorele, this.list[0]);
        newob.list[0] = idorele;
        return newob;
    },

    ihset: function (inner) {
        // j("one").innerset(); ''; 
        // j("one").innerset(html); html;
        inner = inner || "";
        if (Array.isArray(inner)) {
            this.list.forEach(function (ele, index) {
                if (inner[index])
                    ele.innerHTML = inner[index];
            });
        }
        else {
            this.list.forEach(function (ele) {
                ele.innerHTML = inner;
            });
        }
        return this;
    },
    //sets the innerhtmlof the element

    ih: function () {
        return this.list[0].innerHTML;
    },

    oh: function () {
        return this.list[0].outerHTML;

    },// gives the outerhtml of the element

    ohset: function (outer) {
        outer = outer || "";
        if (Array.isArray(outer)) {
            this.list.forEach(function (ele, index) {
                if (outer[index])
                    ele.outerHTML = outer[index];
            });
        }
        else {
            this.list.forEach(function (ele) {
                ele.outerHTML = outer;
            });
        }
    },

    parent: function () {
        /// <summary>returns the common parent or the parent of first element</summary>
        /// <returns type="ob" />
        var newob = Object.create(ob);
        newob.list = [];
        newob.list[0] = this.list[0].parentElement;
        return newob;
    },

    parentsall: function () {
        /// <summary>returns all the parents of all the elements</summary>
        /// <returns type="ob" />
        //it selects all the parent nodes of all the passed elements.
        var newob = Object.create(ob);
        var list = [];
        this.list.forEach(function (ele) {
            list.push(ele.parentElement);
        });
        newob.list = list;
        return newob;
    },

    children: function () {
        /// <summary>returns all the children of the element</summary>
        /// <returns type="ob" />
        // it selects all the direct children nodes
        var newob = Object.create(ob);
        var list = [];
        this.list.forEach(function (ele) {
            var children = ele.children;
            var clen = children.length;
            for (var i = 0; i < clen; i++) {
                list.push(children[i]);
            }
        });
        newob.list = list;
        return newob;
    },

    next: function () {
        /// <summary>returns the next element of all the elements</summary>
        /// <returns type="ob" />
        var newob = Object.create(ob);
        var list = [];
        this.list.forEach(function (ele) {
            list.push(ele.nextElementSibling);
        });
        newob.list = list;
        return newob;
    },

    prev: function () {
        /// <summary>returns the previous element of all the elements selected</summary>
        /// <returns type="ob" />
        var newob = Object.create(ob);
        var list = [];
        this.list.forEach(function (ele) {
            list.push(ele.previousElementSibling);
        });
        newob.list = list;
        return newob;
    },

    firstchild: function () {
        /// <summary>returns the first element child of the current element</summary>
        /// <returns type="ob" />
        var newob = Object.create(ob);
        var list = [];
        this.list.forEach(function (ele) {
            list.push(ele.firstElementChild);
        });
        newob.list = list;
        return newob;
    },// j("one").firstchild();

    lastchild: function () {
        /// <summary>returns the last chidren of all the elements</summary>
        /// <returns type="ob" />
        var newob = Object.create(ob);
        var list = [];
        this.list.forEach(function (ele) {
            list.push(ele.lastElementChild);
        });
        newob.list = list;
        return newob;
    },

    findparent: function (until) {

        /// <summary>it goesup through the dom tree to find it's parants when it finds it just returns ob with them</summary>
        /// <param name="until" type="String">class name of the parent to find</param>
        // go up check all the parets for specified selector and return all the elemetns 
        //j('.span').findparent('one'); // it goes up until it finds a parents whose id is 'one'
        /// <returns type="ob" />
        if (until) {
            var newob = Object.create(ob);
            var list = [];
            this.list.forEach(function (ele) {
                var now = ele;
                var next = ele.parentElement;
                while (next) {
                    if (!(next.className.search(until) === -1)) {
                        list.push(next);
                        next = null;
                        continue;
                    }
                    else {
                        next = next.parentElement;
                    }
                }

            });
            newob.list = list;
            return newob;
        }
    },

    attr: function (name) {

        /// <summary>get or set attributes j("one").attr("id"), j("one").attr({id:'nothing', class='class'})</summary>
        /// <param name="name" type="String">pass in a string and it returns the value of that property of eleent</param>
        /// <param name="name" type="Object">pass in an object and it sets the property of attribute </param>
        /// <returns type="String" />

        if (name) {
            if (typeof name == 'string') {
                return this.list[0].getAttribute(name);
            }
            else {
                this.list.forEach(function (ele) {
                    for (var item in name) {
                        ele.setAttribute(item, name[item]);
                    }
                });
            }

        }
        return this;
    },

    addclass: function (className) {
        /// <summary>addclass to classList of any element</summary>
        /// <returns type="ob" />
        if (className) {
            this.list.forEach(function (ele) {
                if (ele.classList) {
                    ele.classList.add(className);
                }
                else {
                    if (ele.className.search(className) == -1)
                        ele.className += " " + className;
                }
            });
        }
        return this;
    },

    removeclass: function (className) {
        /// <summary>remove class from classList</summary>
        /// <param name="className" type="String">Class name to be removed.</param>
        /// <returns type="ob" />
        if (className) {
            this.list.forEach(function (ele) {

                if (ele.classList)
                    ele.classList.remove(className);
                else {
                    var b = ele.className;
                    var c = b.split(" ");
                    for (var i = 0; i < c.length; i++) {
                        if (c[i] == className) {
                            c.splice(i, 1);
                        }
                    }
                    ele.className = c.join(" ");
                }
            });
        }
        return this;
    },

    isclass: function (className) {
        /// <summary>if class is present to an element</summary>
        /// <param name="className" type="String">className: </param>
        /// <returns type="Boolean" />
        if (className) {
            var retu;
            retu = this.list.every(function (ele) {
                if (ele.classList) {
                    return ele.classList.contains(className);
                }
                else
                    if (ele.className.search(className) === -1)
                        return false;
                    else
                        return true;

            });

        }

        return retu;
    },

    toggleclass: function (classname) {
        /// <summary>toggleclass</summary>
        /// <param name="classname" type="String">classname</param>
        /// <returns type="ob" />

        if (classname) {
            this.list.forEach(function (ele) {
                if (ele.classList)
                    ele.classList.toggle(classname);
                else {
                    if (ele.className.search(classname) === -1) {
                        j(ele).addclass(classname);
                    }
                    else {
                        j(ele).removeclass(classname);
                    }
                }

            });
            return this;
        }

    },

    wrap: function (htmlornode) {
        /// <summary>wrap an element with sometherelement or html</summary>
        /// <returns type="ob" />
        // wrap a node with something else;
        if (!(typeof htmlornode == "string")) {
            htmlornode = htmlornode.outerHTML;
        }
        this.list.forEach(function (ele) {
            j(ele).addsib(htmlornode, 'before').prev().addchild().replacewith(ele);
        });
        return this;

    },

    wrapsibs: function (htmlornode) {
        /// <summary>pass in html or node to wrap all the sibs</summary>
        /// <param name="htmlornode" type="String">Htmlornode</param>
        /// <returns type="ob" />
        if (!(typeof htmlornode == "string")) {
            htmlornode = htmlornode.outerHTML;
        }
        var newchild = j(this.list[0]).addsib(htmlornode, 'before').prev();
        this.list.forEach(function (ele) {
            newchild.addchild().replacewith(ele);
        });
        return this;
    },

    client: function () {
        /// <summary>gives the position information about any element like top, left, right, bottom according to viewport and with and height values</summary>
        /// <returns type="ClientRect" />
        var a = this.list[0].getBoundingClientRect();
        a.width = a.width || (a.right - a.left);
        a.height = a.height || (a.top - a.bottom);
        return a;

    } // top, left, width, height, bottom, right
};

    // jstuff
    // w- window, d-document, b-j.b
    window.j = function (selector) {
        /// <summary>j("#id .class")</summary>
        /// <param name="selector" type="String">Id or Class or both as many as you want.</param>
        /// <returns type="ob" />

        if (selector) {
            var newob = Object.create(ob);
            var d = document;

            var list = [];
            if (typeof selector === "string") {
                selector = selector.split(" ");
                selector.forEach(function (a) {
                    if (a[0] == '.') {
                        var ele = d.getElementsByClassName(a.substr(1));
                        if (ele.length === 0) { edebug("classname " + a[0] + " not found"); };
                        for (var i = ele.length; i > 0; i--) {
                            list.push(ele[i - 1]);
                        }
                    }
                    else {
                        var c = d.getElementById(a);
                        if (c) { list.push(c) }
                        else { edebug("Id " + a + " is not Found"); };
                    }


                });
            }
            else {
                list.push(selector);
            }
        }
        else {
            edebug("no selectors found");
          
        }
        newob.list = list;
        return newob;
    };

//example of usage: => get the element with id "id", and change it's color to red and asign a click even to it. 

// using j+ framework
// j("id").s("color","red").c(function(){},false);

//  ==== (in pure javascript)
//var a =  document.getElementById("id");
// a.style.color="red";
//a.addEventListener("click",function(){},false);

//  ==== (in jquery)
// $("id").css("color", "red").click(function(){});
