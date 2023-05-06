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
const csvtojson=require('csvtojson')
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
const Col=require('./col')
const hostcol="SRMSCET BLY"
/*
async function ins(a){
try{

for(let i=0;i<a.length;i++){
    if(a[i].B!=undefined && isNaN(a[i].B)==0){
        const col=new Col({
            roll:a[i].B,
            name:a[i].C || a[i].D
        })
        await col.save()
    
}

}}
catch(e){
    const file1=`${__dirname}/srmscet.xlsx`

const file2=`${__dirname}/srmscetr.xlsx`

const excelToJson = require('convert-excel-to-json');
 
const result = excelToJson({
    sourceFile: file1
});
const result2 = excelToJson({
    sourceFile: file2
});

 
const btech=result['b-tech'],bph=result['B.PHARMA'],mba=result['mbamca'],mtech=result['mtech-m-pharm'],cetr=result2['CETR']



ins(btech) 
ins(bph)
ins(mba)
ins(mtech)
ins(cetr)


}}*/

app.get('',(req,res)=>{
    res.render('login')
})
app.post('/login',async (req,res)=>{
try{


if(req.body.user==process.env.user && req.body.pass==process.env.pass){
    res.render('sign')
}
else {
   res.render('login',{
    msg:'Invalid Details'
   })
}

}
catch(e){

}
})
app.get('/signedingowiqbfjsnvvnrbvjsnfpd',(req,res)=>{



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

const roll=req.body.rollno
const cole=req.body.college

if(cole=="SRMSCET BLY" || cole=="SRMSCET&R BLY" ){
    const us=await Col.findOne({roll:roll})
    if(us==null){
        console.log('error')
        throw new Error()
    }
    console.log(us)
}

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

     event=req.body.event6
     if(event!=null && event!='')
      events=   events.concat({event})
      event=req.body.event7
    if(event!=null && event!='')
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

      pdfDoc.fontSize(34).text(`SRMS CET BLY`,{underline:true,align:'center'});
      pdfDoc.moveDown(0.6);
      pdfDoc.fontSize(25).text(`TECHVYOM 2K23`,{underline:true,align:'center'});
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
        f=1
        res.render('msg',{
            msg:"Invalid User"
        })
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
let worksheet=workbook.addWorksheet(req.body.event)
worksheet.getCell('A1').value=event
worksheet.mergeCells('A1:G1')
worksheet.getCell('A1').alignment={horizontal:'center'}
worksheet.addRow(4).values=['PID','NAME','ROLLNO','COLLEGE','COURSE','BRANCH',]
worksheet.columns=[
    {  key:"pid" ,width:25 },
    {  key:"name" ,width:25 },
    {  key:"rollno" ,width:25 },
    {  key:"College" ,width:25 },
    { key:"Course" ,width:25 },
    { key:"Branch" ,width:25 },
  
    
]
for(let i=0;i<user.length;i++){
    user[i]['event']=event
}
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
        let flag=1
        if(f1){f1=0;
let pid;
console.log('h1')
const u=await Id.findOne({});
pid=u.tid
console.log(u);
console.log(pid)
    console.log(req.body);
    let events=[],pi=[],pi1=[],col=[]
  
   /*
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
*/
let l=0;
 let pidd=req.body.name1
if(pidd!=undefined)
{pi1=   pi1.concat({pidd})

const user=await User.findOne({pid:pidd})
if(user==undefined){
    f1=1
res.render('msg',{
    msg:"Not a valid users !"
})
}
console.log(user)
pi=pi.concat({pidd:user.name})
col=col.concat({co:user.College})
const grpuser=await Grp.find({'name.pidd':pidd})
let a=user.events.length + grpuser.length
console.log(a)
if(a>l)l=a

}

pidd=req.body.name2
if(pidd!=undefined)
{pi1=   pi1.concat({pidd})

const user=await User.findOne({pid:pidd})
if(user==undefined){f1=1
res.render('msg',{
    msg:"Not a valid users !"
})
}
pi=pi.concat({pidd:user.name})
col=col.concat({co:user.College})
const grpuser=await Grp.find({'name.pidd':pidd})
let a=user.events.length + grpuser.length
if(a>l)l=a

}
pidd=req.body.name3
if(pidd!=undefined)
{pi1=   pi1.concat({pidd})

const user=await User.findOne({pid:pidd})
if(user==undefined){f1=1
res.render('msg',{
    msg:"Not a valid users !"
})
}
pi=pi.concat({pidd:user.name})
col=col.concat({co:user.College})
const grpuser=await Grp.find({'name.pidd':pidd})
let a=user.events.length + grpuser.length
if(a>l)l=a

}
pidd=req.body.name4
if(pidd!=undefined)
{pi1=   pi1.concat({pidd})

const user=await User.findOne({pid:pidd})
if(user==undefined){f1=1
res.render('msg',{
    msg:"Not a valid users !"
})
}
pi=pi.concat({pidd:user.name})
col=col.concat({co:user.College})
const grpuser=await Grp.find({'name.pidd':pidd})
let a=user.events.length + grpuser.length
if(a>l)l=a

}
pidd=req.body.name5
if(pidd!=undefined)
{pi1=   pi1.concat({pidd})

const user=await User.findOne({pid:pidd})
if(user==undefined){f1=1
res.render('msg',{
    msg:"Not a valid users !"
})
}
pi=pi.concat({pidd:user.name})
col=col.concat({co:user.College})
const grpuser=await Grp.find({'name.pidd':pidd})
let a=user.events.length + grpuser.length
if(a>l)l=a

}
pidd=req.body.name6
if(pidd!=undefined)
{pi1=   pi1.concat({pidd})

const user=await User.findOne({pid:pidd})
if(user==undefined){f1=1
res.render('msg',{
    msg:"Not a valid users !"
})
}
pi=pi.concat({pidd:user.name})
col=col.concat({co:user.College})
const grpuser=await Grp.find({'name.pidd':pidd})
let a=user.events.length + grpuser.length
if(a>l)l=a

}
pidd=req.body.name7
if(pidd!=undefined)
{pi1=   pi1.concat({pidd})

const user=await User.findOne({pid:pidd})
if(user==undefined){f1=1
res.render('msg',{
    msg:"Not a valid users !"
})
}
pi=pi.concat({pidd:user.name})
col=col.concat({co:user.College})
const grpuser=await Grp.find({'name.pidd':pidd})
let a=user.events.length + grpuser.length
if(a>l)l=a

}
pidd=req.body.name8
if(pidd!=undefined)
{pi1=   pi1.concat({pidd})

const user=await User.findOne({pid:pidd})
if(user==undefined){f1=1
res.render('msg',{
    msg:"Not a valid users !"
})
}
pi=pi.concat({pidd:user.name})
col=col.concat({co:user.College})
const grpuser=await Grp.find({'name.pidd':pidd})
let a=user.events.length + grpuser.length
if(a>l)l=a

}

for(let i=0;i<col.length;i++){
    if(col[i].co!=hostcol){
        flag=0;
        break;
    }
}


if(flag==0){
l=5-l;}
else {
    l=7-l
}

if(l<=0){
    f1=1
    res.render('msg',{
        msg:"Not a valid users"
    })
    return
}


    const grp=new Grp({
        tid:pid,
        pid:pi,
        events:req.body.event1,
        name:pi1
       
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

      pdfDoc.fontSize(34).text(`SRMS CET BLY`,{underline:true,align:'center'});
      pdfDoc.moveDown(0.6);
      pdfDoc.fontSize(25).text(`TECHVYOM 2K23`,{underline:true,align:'center'});
      pdfDoc.moveDown(0.8);
      pdfDoc.fontSize(16).text(`TID - ${user.tid}`);pdfDoc.moveDown(0.25);
      pdfDoc.fontSize(16).text(`EVENT - ${user.events}`);
      pdfDoc.moveDown(0.8);
      pdfDoc.fontSize(20).text(`Team Member`,{underline:true} );
      pdfDoc.moveDown(0.5);
      let c=1
    for(let i=0;i<pi.length;i++)
      {
        pdfDoc.fontSize(16).text(`${c}. ${pi[i].pidd} (${pi1[i].pidd})`);
        pdfDoc.moveDown(0.25);
        pdfDoc.fontSize(16).text(`College - ${col[i].co}`);
        pdfDoc.moveDown(0.25);
        c=c+1
      }
      


      pdfDoc.end();


/*
res.render('msg',{
    msg:`Your TID is ${otid}`
})*/
}

}
    catch(e){
f1=1
    }
})

app.get('/grpse', async (req,res)=>{
    res.render('grpevent');
})

app.post('/grp/data',async(req,res)=>{
    const user=await Grp.find({events:req.body.event});


    let workbook=new excel.Workbook();
    let worksheet=workbook.addWorksheet(req.body.event);

    worksheet.getCell('A1').value=req.body.event
worksheet.mergeCells('A1:G1')
worksheet.getCell('A1').alignment={horizontal:'center'}

worksheet.addRow(4).values=['TID','NAME1','NAME2','NAME3','NAME4','NAME5','NAME6','NAME7','NAME8','NAME9','NAME10']
    worksheet.columns=[{ key:"tid" ,width:25 },
        {  key:"name1" ,width:25 },
        {  key:"name2" ,width:25 },
        {  key:"name3" ,width:25 },
        {  key:"name4" ,width:25 },
        {  key:"name5" ,width:25 },
        {  key:"name6" ,width:25 },
        {  key:"name7" ,width:25 },
        {  key:"name8" ,width:25 },
        {  key:"name9" ,width:25 },
        {  key:"name10" ,width:25 },
    
        
    ]
    let st=""
  
    let users=[];
    user.forEach((e)=>{
        let su={"tid":e.tid},c=1;
        console.log(e)

    
for(let i=0;i<e.pid.length;i++){
    su[`name${i+1}`]=`${e.pid[i].pidd} (${e.name[i].pidd} ) `
}
su['event']=req.body.event
      
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
    let grpuser=await Grp.find({'name.pidd':user.pid})
    let a=grpuser.length



    let l=user.events.length;
    l=a+l

if(user.College==hostcol){
    l=7-l;
}
else{
    l=5-l
}

    
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
    try{
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

     event=req.body.event6
     if(event!=null && event!='')
      events=   events.concat({event})
      event=req.body.event7
    if(event!=null && event!='')
     events=   events.concat({event})

let newEvent=[]
     for(let i=0;i<events.length;i++){
        var j=newEvent.findIndex( e=>e.event==events[i].event)
        if(j<=-1){
            newEvent.push({event:events[i].event})
        }
     }

     

user.events=newEvent
await user.save();
const pdfDoc= new PDFDocument();
    
      res.setHeader('Content-Type','application/pdf');
      res.setHeader('Content-Disposition','inline;filename=" ' + "SampleDocument" +'" ');

      pdfDoc.pipe(fs.createWriteStream('SampleDocument.pdf'));
      pdfDoc.pipe(res);

      pdfDoc.fontSize(34).text(`SRMS CET BLY`,{underline:true,align:'center'});
      pdfDoc.moveDown(0.6);
      pdfDoc.fontSize(25).text(`TECHVYOM 2K23`,{underline:true,align:'center'});
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

console.log(user)}
catch(e){
    res.render('msg',
    {
        msg:"Already Registered in that event"
    })
}
})
const port=process.env.port||3002
app.listen(port,()=>{

})


app.get('/sea',(req,res)=>{
    res.render('sea')
})

app.post('/sead',async (req,res)=>{
    try{
    let pid=req.body.pid
    const tid=req.body.tid
    const roll=req.body.rollno

    if(roll!=null && roll!=''){
        const user=await User.findOne({rollno:roll})
        if(user!=null){
            pid=user.pid
        }
    }

    if(pid!=null && pid!=''){
        console.log('pid')
        const user=await User.findOne({pid:pid})
        console.log(user)
        if(user==undefined){
            res.render('msg',{
                msg:"Invalid pid or tid"
            })

            return
        }
        const pdfDoc= new PDFDocument();
        const grps=await Grp.find({'name.pidd':pid})

    
      res.setHeader('Content-Type','application/pdf');
      res.setHeader('Content-Disposition','inline;filename=" ' + "SampleDocument" +'" ');

      pdfDoc.pipe(fs.createWriteStream('SampleDocument.pdf'));
      pdfDoc.pipe(res);

      pdfDoc.fontSize(34).text(`SRMS CET BLY`,{underline:true,align:'center'});
      pdfDoc.moveDown(0.6);
      pdfDoc.fontSize(25).text(`TECHVYOM 2K23`,{underline:true,align:'center'});
      pdfDoc.moveDown(0.8);
      pdfDoc.fontSize(16).text(`PID - ${user.pid}`);pdfDoc.moveDown(0.25);
      pdfDoc.fontSize(16).text(`Name - ${user.name}`);pdfDoc.moveDown(0.25);
      pdfDoc.fontSize(16).text(`Rollno - ${user.rollno}`);pdfDoc.moveDown(0.25);
      pdfDoc.fontSize(16).text(`College - ${user.College}`);pdfDoc.moveDown(0.25);
      pdfDoc.fontSize(16).text(`Course - ${user.Course}`);
      if(user.Branch!=null && user.Branch!=''){pdfDoc.moveDown(0.25);
      pdfDoc.fontSize(16).text(`Branch - ${user.Branch}`);}
      pdfDoc.moveDown(0.8);
      pdfDoc.fontSize(20).text(`Individual Events Registered`,{underline:true} );
      pdfDoc.moveDown(0.5);
      let c=1
      user.events.forEach((e)=>{
        pdfDoc.fontSize(16).text(`${c}. ${e.event}`);
        pdfDoc.moveDown(0.25);
        c=c+1
      })
      pdfDoc.fontSize(20).text(`Group Events Registered`,{underline:true} );
      pdfDoc.moveDown(0.5);
      for(let i=0;i<grps.length;i++){
        pdfDoc.fontSize(16).text(`${i+1}. ${grps[i].events} (Tid - ${grps[i].tid} )`);
        pdfDoc.moveDown(0.25);
      }

      pdfDoc.end();

    }
    else if(tid!=null && tid!='') {
        console.log('tid')
        const user=await Grp.findOne({tid:tid})
        if(user==undefined){
            res.render('msg',{
                msg:"Invalid pid or tid"
            })
            return
        }
        const pi=user.pid,pi1=user.name
        let col=[]
console.log(user)
        for(let i=0;i<pi1.length;i++){
            const user1=await User.findOne({pid:pi1[i].pidd})
            console.log(pi1)
            col=col.concat({co:user1.College})
        }
        console.log(col)

        const pdfDoc= new PDFDocument();
    
      res.setHeader('Content-Type','application/pdf');
      res.setHeader('Content-Disposition','inline;filename=" ' + "SampleDocument" +'" ');

      pdfDoc.pipe(fs.createWriteStream('SampleDocument.pdf'));
      pdfDoc.pipe(res);

      pdfDoc.fontSize(34).text(`SRMS CET BLY`,{underline:true,align:'center'});
      pdfDoc.moveDown(0.6);
      pdfDoc.fontSize(25).text(`TECHVYOM 2K23`,{underline:true,align:'center'});
      pdfDoc.moveDown(0.8);
      pdfDoc.fontSize(16).text(`TID - ${user.tid}`);pdfDoc.moveDown(0.25);
      pdfDoc.fontSize(16).text(`EVENT - ${user.events}`);
      pdfDoc.moveDown(0.8);
      pdfDoc.fontSize(20).text(`Team Member`,{underline:true} );
      pdfDoc.moveDown(0.5);
      let c=1
    for(let i=0;i<pi.length;i++)
      {
        pdfDoc.fontSize(16).text(`${c}. ${pi[i].pidd} (${pi1[i].pidd})`);
        pdfDoc.moveDown(0.25);
        pdfDoc.fontSize(16).text(`College - ${col[i].co}`);
        pdfDoc.moveDown(0.25);
        c=c+1
      }
      


      pdfDoc.end();





    }
    else{
        res.render('msg', {
            msg:"Invalid pid or tid"
        })
    }

}
    catch(e){

    }
})




//mongodb://127.0.0.1:27017/pid
