let form=document.querySelector('form');

document.querySelector(".cal").onclick= function(){

    console.log("clicked");
    const part=document.querySelector('.i1').value;
    const event=document.querySelector('.i2').value;
document.querySelector(".val").style.display="none";
form.style.display="flex";

for(let i=1;i<=part;i++)form.innerHTML+=`<input type="number" name="pid${i}" required placeholder="PID ${i}" >`
for(let i=1;i<=event;i++)form.innerHTML+=`
<input list="brow" placeholder="Event ${i}" name="event${i}"  >
<datalist id="brow">
  <option value="Mini hackathon">
  <option value="Code war">
  <option value="Bring the beauty">
  <option value="Design the web">
  <option value="Bug war">
    <option value="E treasure hunt"></option>
    <option value="C expert"></option>
    <option value="Blind coding"></option>
    <option value="Junk wars"></option>
    <option value="Drone race"></option>
    <option value="Futuristic techno panel game"></option>
    <option value="Drag and place"></option>
    <option value="Line follower robot"></option>
    <option value="Robo race"></option>

    <option value="Robo war"></option>
    <option value="Robo soccer"></option>
    <option value=""></option>

    <option value="Maze solver"></option>
    <option value="Chain reaction"></option>
    <option value="Glider plane"></option><option value="Shabd e shayrana"></option>
    <option value="Bridge building"></option>
    <option value="Cad tricks"></option>
    <option value="Dumb charades on book"></option>
    <option value="Who am i"></option>
    <option value="Jam just a minute"></option>
    <option value="Be the sherlock holmes"></option>
        <option value="Aavishkarak"></option>
            <option value="Pharmadesk"></option>
                <option value="Pharma bins and recycling"></option>
                    <option value="Pharma minds"></option>
                        <option value="Mandala art competition"></option>
                            <option value="Ad mad"></option>
                                <option value="Business quiz"></option>
                                    <option value="Business plan"></option>
                                        <option value="Doodle art"></option>
                                            <option value="Technical painting"></option>
                                                <option value="Quill the techvyom"></option>
    <option value="Digital poster making"></option>    <option value="Screen masters"></option>
        <option value="Pursue the market"></option>
            <option value="Battle of memes"></option>
                <option value="Mini militia"></option>
                    <option value="Fifa"></option>
                        <option value="Tech gallery"></option>
                            <option value="Plc designing"></option>
                                <option value="Technical quiz"></option>
                                    <option value="Round the cube"></option>

</datalist>  `
form.innerHTML+=`<button type="submit">Gen</button>`
}

