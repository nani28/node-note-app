const fs=require('fs')
const chalk=require('chalk')

const addNote=(title,body)=>{
    const notes=loadNotes()
    //const duplicateNotes=notes.filter((note)=> note.title===title)
    const duplicateNote=notes.find((note)=>note.title===title)
    
    if(!duplicateNote){
        notes.push({
                title:title,
                body:body
            })
            saveNotes(notes)
            console.log(chalk.bgGreen("New note added!")) 
    }
    else{
        console.log(chalk.bgRed('Note title taken!'))
    }
    // if(duplicateNotes.length !== 0){
    //     console.log(chalk.bgRed('Note title taken!'))
    // }else{
    // notes.push({
    //     title:title,
    //     body:body
    // })
    // saveNotes(notes)
    // console.log(chalk.bgGreen("New note added!"))
    // }
}
const loadNotes=()=>{
    try{
        const dataBuffer=fs.readFileSync("notes.json").toString()
        const JSONnotes=JSON.parse(dataBuffer)
        return JSONnotes
    }catch(e){
        return []
    }
    
}
const saveNotes=(notes)=>{
    const dataJSON=JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)
    return
}
const removeNote=(title)=>{
    const notes=loadNotes()
    const duplicateNotes=notes.filter((note)=>note.title!==title)
    if(duplicateNotes.length < notes.length){
    saveNotes(duplicateNotes)
    console.log(chalk.bgGreen("Note removed!"))
    }
    else{
        console.log(chalk.bgRed("Note not found!"))
    }
}
const listNotes=()=>{
    const notes=loadNotes()
    
    console.log(chalk.yellow.inverse('Your Notes'))
    notes.forEach((note) => {
        console.log(note.title)
    });
}
const readNotes=(title)=>{
    const notes=loadNotes()
    const readNote=notes.find((note)=>note.title===title)
    if(readNote){
        console.log(chalk.inverse(readNote.title))
        console.log(readNote.body)
    }
    else{
        console.log(chalk.red.inverse('No note found?'))
    }

}
module.exports={
    addNote:addNote,
    removeNote:removeNote,
    listNotes:listNotes,
    readNotes:readNotes
}