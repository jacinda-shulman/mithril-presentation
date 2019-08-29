
// openGamePage mounts the Game HTML, then mounts the responsive DOM objects afterwards
function openGamePage(){
    m.mount(document.body, Game) 
    m.mount(document.querySelector('#name-label'), nameLabel)
    m.mount(document.querySelector('#name-box'), nameBox)
    m.mount(document.querySelector('#stickman'), stickman)
    m.mount(document.querySelector('#stolen-pens'), stolenLabel)
    m.mount(document.querySelector('#classroom1'), classroom1)
    m.mount(document.querySelector('#classroom2'), classroom2)
    m.mount(document.querySelector('#classroom3'), classroom3)
 }

//---------------------------------------------------------------------------------------

// Game page organized using flex containers
var Game = {
    view: function(){
        return m("div", {"class":"flex-main"},
    [   // sidebar (left side with textbox)
        m("div", {"class":"flex-column","id":"sidebar"}, 
            m("div", {"id": "name-box"})),
        // items bar (right side containing pics and stuff)
        m("div", {"id":"items"},
        [
          // Name label above stick man
          m("div", {"class":"flex-container"}, 
            m("", {"id":"name-label"})),          
        
          // Stick man!
          m("div", {"class":"flex-container"},
            [ m("div", {"id":"stickman"}),                
              m("div", {"class":"flex-column"}, 
              m("label", {"id":"stolen-pens"}),
              m("label", " markers"))
            ]),

          // Classrooms and labels beneath them
          m("div", {"class":"flex-container"},
            [
              m("div", {"id":"classroom1", "class":"c"}),
              m("div", {"id":"classroom2", "class":"c"}),
              m("div", {"id":"classroom3", "class":"c"})
            ]
        )
        ])]
    )}
}

//---------------------------------------------------------------------------------------
// Classroom components


var countLabel = {
    view: function(vnode){
        return m("label", vnode.attrs.count)
    }
}

var picture = {
    view: function(vnode){
        return m("img", {"class":"croom","src":"images/pic_classroom.PNG","alt":"Classroom",
                        onclick: function(){
                            vnode.attrs.current.count--
                            stolen++
                        }})
    }    
}

var classroom1 = {
    current:{
        count: 100
    },
    clickClassroom: function(vnode){
        current.count++
    },
    view: function(vnode){
        return  m("div", {"class":"c"},
        [
          m(countLabel, {count: vnode.state.current.count}),
          m("label", " markers"),
          m(picture, {current: vnode.state.current})
        ])
                
    }
}
var classroom2 = {
    current:{
        count: 100
    },
    clickClassroom: function(vnode){
        current.count++
    },
    view: function(vnode){
        return  m("div", {"class":"c"},
        [
          m(countLabel, {count: vnode.state.current.count}),
          m("label", " markers"),
          m(picture, {current: vnode.state.current})
        ])
                
    }
}
var classroom3 = {
    current:{
        count: 100
    },
    clickClassroom: function(vnode){
        current.count++
    },
    view: function(vnode){
        return  m("div", {"class":"c"},
        [
          m(countLabel, {count: vnode.state.current.count}),
          m("label", " markers"),
          m(picture, {current: vnode.state.current})
        ])
                
    }
}

//---------------------------------------------------------------------------------------
// Components for the pen counters
stolen = 6
var stolenLabel = {
    view: function(){
        return m("label", {"id":"stolen-pens"}, stolen)
    }
}

var mild = "images/pic_nick_normal.PNG"
var ninja = "images/pic_nick_ninja.PNG"

var stickman = {
    pic: mild,
    view: function(vnode){
        return m("img", {"src": vnode.state.pic,"id":"stickman","alt":"Stickman",
            onclick: function(){
                if (vnode.state.pic == mild){
                    vnode.state.pic = ninja
                    name = "Ninja " + name
                }
                else {
                    vnode.state.pic = mild
                    name = textBoxValue
                }
            }})
    }
}

//---------------------------------------------------------------------------------------
// Components to change the label (name of the stick man) 

var name = ""
var textBoxValue = ""
var nameBox = {
    view: function(){
      return m("", 
            m("label", {"class":"ctag"}, "Type here to change the stick man's name!"),
            m("br"),
            m("input", {"type": "text", "id": "name-box",
            oninput: function(){
                textBoxValue = this.value    
                name = this.value}})
      )
    }
}

var nameLabel = {
    view: function(){
        return m("label", {"id":"name-label"}, name)
    }
}



//---------------------------------------------------------------------------------------




var sendRequest = function(){
    return m.request({
        method: "GET",
        url: "https://rem-rest-api.herokuapp.com/api/users",
        withCredentials: true,
    })
    .then(function(result) {
        console.log(result.data)
    }).catch(function (e) {
        console.log(e)
    })
}

var xhr = {
    view: function(){
        return m("button", {onclick: sendRequest}, "Click to send GET request")
    }
}


//-------------------------------------------------------------------------------------


let Hello= {
    view: function(){
        return m("div", {"class": "flex-container"},
            m("button", {onclick: openGamePage}, "Let's play a game!"))
    }
}


m.route(document.body, "/hello",{
    "/hello": Hello,
    "/xhr": xhr
})