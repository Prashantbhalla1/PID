const express=require('express');
require('./mongoose');
const excel=require('exceljs')
const User = require('./user');const path=require('path')
const app=express();
require('dotenv').config()
const Grp = require('./grp');
const Id=require('./id')
const PDFDocument = require('pdfkit');
const fs = require('fs');
const hbs=require('hbs')
app.use(express.urlencoded());
app.use(express.json())
const cookie=require('cookie-parser')
const urll=path.join(__dirname,'/public')
app.use(express.static(urll))
const parturl=path.join(__dirname,'/template/partials')
console.log(parturl)
hbs.registerPartials(parturl)
app.use(cookie());
app.set('view engine', 'hbs');
const tempurl=path.join(__dirname,'/template/views')
app.set('views',tempurl)
app.get('',(req,res)=>{
   res.render('sign')
})




let val=220400,f=1;
app.post('/sign', async (req,res)=>{
    try{
        if(f){f=0;
let pid;
console.log('h1')
const u=await Id.findOne({});
pid=u.pid
console.log(u);
console.log(pid)
    console.log(req.body);
    let events=[]
  
    let event=req.body.event1
    if(event!='')
 events=   events.concat({event})
     event=req.body.event2
    if(event!='')
     events=   events.concat({event})
     event=req.body.event3
    if(event!='')
     events=   events.concat({event})
     event=req.body.event4
    if(event!='')
     events=   events.concat({event})
     event=req.body.event5
    if(event!='')
     events=   events.concat({event})

    const user=new User({
        name:req.body.namee,
        rollno:req.body.rollno,
        College:req.body.college,
        Course:req.body.course,
        Branch:req.body.branch,
        pid:pid,
        events:events
    })
    console.log(user)
    
    await user.save();
    console.log('heeee');
    const opid=pid;
   pid=pid+1;
   u.pid=pid;
   await u.save();
   


f=1;


const pdfDoc= new PDFDocument();
    
      res.setHeader('Content-Type','application/pdf');
      res.setHeader('Content-Disposition','inline;filename=" ' + "SampleDocument" +'" ');

      pdfDoc.pipe(fs.createWriteStream('SampleDocument.pdf'));
      pdfDoc.pipe(res);

      pdfDoc.fontSize(26).text(`SRMS TECHVYOM FEST`,{underline:true,align:'center'});
      pdfDoc.moveDown(0.8);
      pdfDoc.fontSize(16).text(`PID - ${user.pid}`);pdfDoc.moveDown(0.25);
      pdfDoc.fontSize(16).text(`Name - ${user.name}`);pdfDoc.moveDown(0.25);
      pdfDoc.fontSize(16).text(`Rollno - ${user.rollno}`);pdfDoc.moveDown(0.25);
      pdfDoc.fontSize(16).text(`College - ${user.College}`);pdfDoc.moveDown(0.25);
      pdfDoc.fontSize(16).text(`Course - ${user.Course}`);
      if(user.Branch!=null && user.Branch!=''){pdfDoc.moveDown(0.25);
      pdfDoc.fontSize(16).text(`Branch - ${user.Branch}`);}
      pdfDoc.moveDown(0.8);
      pdfDoc.fontSize(20).text(`Events Registered`,{underline:true} );
      pdfDoc.moveDown(0.5);
      let c=1
      user.events.forEach((e)=>{
        pdfDoc.fontSize(16).text(`${c}. ${e.event}`);
        pdfDoc.moveDown(0.25);
        c=c+1
      })
      pdfDoc.end();

/*
res.render('msg',{
    msg:`Your PID is ${opid}`
})*/
}

}
    catch(e){

    }
    
} )
app.get('/event',async (req,res)=>{
    res.render('event')
})
app.post('/event/data',async (req,res)=>{
    try{



        console.log("NEWONE")
      const event=req.body.event;
      const user=await User.find({'events.event':event})

let workbook=new excel.Workbook();
let worksheet=workbook.addWorksheet(req.body.event);
worksheet.columns=[
    { header:"PID", key:"pid" ,width:25 },
    { header:"Name", key:"name" ,width:25 },
    { header:"Rollno", key:"rollno" ,width:25 },
    { header:"College", key:"College" ,width:25 },
    { header:"Course", key:"Course" ,width:25 },
    { header:"Branch", key:"Branch" ,width:25 },
]
worksheet.addRows(user)
res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=" + `${req.body.event}.xlsx`
  );
return workbook.xlsx.write(res).then(function(){
    res.status(200).end();
})



      console.log(user)
      res.render('dis',{
        user:user,
        event:event
      })

    }
catch(e){
    console.log(e)
   
    return
}
})
app.get('/gr',(req,res)=>{
    res.render('grou');
})


let f1=1
app.post('/group',async (req,res)=>{
    try{
        if(f1){f1=0;
let pid;
console.log('h1')
const u=await Id.findOne({});
pid=u.tid
console.log(u);
console.log(pid)
    console.log(req.body);
    let events=[],pi=[]
  
   
     let pidd=req.body.pid1
     if(pidd!=undefined)
  pi=   pi.concat({pidd})

   pidd=req.body.pid2
  if(pidd!=undefined)
pi=   pi.concat({pidd})
 pidd=req.body.pid3
if(pidd!=undefined)
pi=   pi.concat({pidd})
 pidd=req.body.pid4
if(pidd!=undefined)
pi=   pi.concat({pidd})
 pidd=req.body.pid5
if(pidd!=undefined)
pi=   pi.concat({pidd})
 pidd=req.body.pid6
if(pidd!=undefined)
pi=   pi.concat({pidd})
 pidd=req.body.pid7
if(pidd!=undefined)
pi=   pi.concat({pidd})
 pidd=req.body.pid8
if(pidd!=undefined)
pi=   pi.concat({pidd})



    const grp=new Grp({
        tid:pid,
        pid:pi,
        events:req.body.event1,
       
    })
    console.log(grp)
    const otid=pid
    await grp.save();
    console.log('heeee');
   pid=pid+1;
   u.tid=pid;
   await u.save();
   


f1=1;
const user=grp
const pdfDoc= new PDFDocument();
    
      res.setHeader('Content-Type','application/pdf');
      res.setHeader('Content-Disposition','inline;filename=" ' + "SampleDocument" +'" ');

      pdfDoc.pipe(fs.createWriteStream('SampleDocument.pdf'));
      pdfDoc.pipe(res);

      pdfDoc.fontSize(26).text(`SRMS TECHVYOM FEST`,{underline:true,align:'center'});
      pdfDoc.moveDown(0.8);
      pdfDoc.fontSize(16).text(`TID - ${user.tid}`);pdfDoc.moveDown(0.25);
      pdfDoc.fontSize(16).text(`EVENT - ${user.events}`);
      pdfDoc.moveDown(0.8);
      pdfDoc.fontSize(20).text(`Team Member`,{underline:true} );
      pdfDoc.moveDown(0.5);
      let c=1
      user.pid.forEach((e)=>{
        pdfDoc.fontSize(16).text(`${c}. ${e.pidd}`);
        pdfDoc.moveDown(0.25);
        c=c+1
      })
      pdfDoc.end();


/*
res.render('msg',{
    msg:`Your TID is ${otid}`
})*/
}

}
    catch(e){

    }
})

app.get('/grpse', async (req,res)=>{
    res.render('grpevent');
})

app.post('/grp/data',async(req,res)=>{
    const user=await Grp.find({events:req.body.event});


    let workbook=new excel.Workbook();
    let worksheet=workbook.addWorksheet(req.body.event);
    worksheet.columns=[
        { header:"TID", key:"tid" ,width:25 },
        { header:"Name1", key:"name1" ,width:25 },
        { header:"Name2", key:"name2" ,width:25 },
        { header:"Name3", key:"name3" ,width:25 },
        { header:"Name4", key:"name4" ,width:25 },
        { header:"Name5", key:"name5" ,width:25 },
        { header:"Name6", key:"name6" ,width:25 },
        { header:"Name7", key:"name7" ,width:25 },
        { header:"Name8", key:"name8" ,width:25 },
        { header:"Name9", key:"name9" ,width:25 },
        { header:"Name10", key:"name10" ,width:25 },
        
    ]
    let users=[];
    user.forEach((e)=>{
        let su={"tid":e.tid},c=1;
        console.log(e)
        e.pid.forEach((p)=>{
            su[`name${c}`]=p.pidd
            c=c+1
            console.log(p.pidd)

        })
        users=users.concat(su)
    })
    console.log(users)
    worksheet.addRows(users)
    res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=" + `${req.body.event}.xlsx`
      );
    return workbook.xlsx.write(res).then(function(){
        res.status(200).end();
    })




    res.render('tid',{
        user:user,
        event:req.body.event
    })
    
   console.log(user)

})


app.get('/prepid',(req,res)=>{

res.render('pre');


})
app.post('/pidchk', async (req,res)=>{
    
let user1=await User.findOne({pid:req.body.pid});
let user2=await User.findOne({rollno:req.body.rollno});
const user=user1||user2
if(user){
    let l=user.events.length;
    l=5-l;
    let us=[]
    console.log(l)
    for(let i=1;i<=l;i++)us=us.concat({"name":"ab","no":i})
if(l<=0){
    res.render('msg',{
        msg:"Sorry user reaches the max limit !"
    })
    return;
}

    res.render('preevent',{
        pid:user.pid,
        user:us
    })

}
else{
    res.render('msg',{
        msg:"Invalid PID"
    })
}
})

app.post('/preevent/data',async(req,res)=>{
    console.log(req.body)
const user=await User.findOne({pid:req.body.pid});
let events=user.events;
  
    let event=req.body.event1
    if(event!=null && event!='')
 events=   events.concat({event})
     event=req.body.event2
    if(event!=null && event!='')
     events=   events.concat({event})
     event=req.body.event3
    if(event!=null && event!='')
     events=   events.concat({event})
     event=req.body.event4
    if(event!=null && event!='')
     events=   events.concat({event})
     event=req.body.event5
    if(event!=null && event!='')
     events=   events.concat({event})
user.events=events
await user.save();
const pdfDoc= new PDFDocument();
    
      res.setHeader('Content-Type','application/pdf');
      res.setHeader('Content-Disposition','inline;filename=" ' + "SampleDocument" +'" ');

      pdfDoc.pipe(fs.createWriteStream('SampleDocument.pdf'));
      pdfDoc.pipe(res);

      pdfDoc.fontSize(26).text(`SRMS TECHVYOM FEST`,{underline:true,align:'center'});
      pdfDoc.moveDown(0.8);
      pdfDoc.fontSize(16).text(`PID - ${user.pid}`);pdfDoc.moveDown(0.25);
      pdfDoc.fontSize(16).text(`Name - ${user.name}`);pdfDoc.moveDown(0.25);
      pdfDoc.fontSize(16).text(`Rollno - ${user.rollno}`);pdfDoc.moveDown(0.25);
      pdfDoc.fontSize(16).text(`College - ${user.College}`);pdfDoc.moveDown(0.25);
      pdfDoc.fontSize(16).text(`Course - ${user.Course}`);
      if(user.Branch!=null && user.Branch!=''){pdfDoc.moveDown(0.25);
      pdfDoc.fontSize(16).text(`Branch - ${user.Branch}`);}
      pdfDoc.moveDown(0.8);
      pdfDoc.fontSize(20).text(`Events Registered`,{underline:true} );
      pdfDoc.moveDown(0.5);
      let c=1
      user.events.forEach((e)=>{
        pdfDoc.fontSize(16).text(`${c}. ${e.event}`);
        pdfDoc.moveDown(0.25);
        c=c+1
      })
      pdfDoc.end();

console.log(user)
})
const port=process.env.port||3002
app.listen(port,()=>{

})



//mongodb://127.0.0.1:27017/pid
