
import './App.css';
import { Component } from 'react';

class App extends Component{

  constructor(props){
    super(props);
    this.state={
      notes:[]
    }
  }

  API_URL = "http://localhost:5208/"


  componentDidMount(){
    this.refreshNotes();
  }


  async refreshNotes(){
    fetch(this.API_URL+"api/todoapp/GetNotes").then(response=>response.json()).then(data=>{this.setState({notes:data})});
  }

  async addClick(){
    var newNotes = document.getElementById("newNotes").value;
    const data = new FormData();
    data.append("newNotes",newNotes);

    fetch(this.API_URL+"api/todoapp/AddNotes",{
      method:"POST",
      body:data
    }).then(res=>res.json()).then((result)=>{
      alert(result);
      this.refreshNotes();
      
    })
  }

  async deleteClick(id){
    var newNotes = document.getElementById("newNotes").value;
    const data = new FormData();
    data.delete("newNotes",newNotes);

    fetch(this.API_URL+"api/todoapp/DeleteNotes?id="+id,{
      method:"DELETE",
      body:data
    }).then(res=>res.json()).then((result)=>{
      alert(result);
      this.refreshNotes();
      
    })
  }

  render() {
    const{notes}=this.state;
    return (
      <div className="flex flex-col items-center justify-center">
        <div className='flex flex-col items-center justify-center shadow-lg mt-20 p-4'>
          <p className='text-[40px] '>Todo App</p>
          <div className='flex flex-row items-center justify-center'>
            <input id='newNotes' placeholder="Type your note here" className='text-center border-blue-700 border-2' />&nbsp;
            <button onClick={()=>this.addClick()} className='bg-gray-400 px-[3px]'>Add</button>
          </div>
          
          

          <table className='mt-4'>
            <thead>
              <tr>
                <th className='text-left'>Note</th>
                <th className='text-left'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {notes.map(note => (
                <tr key={note.id}>
                  <td className='font-semibold'>{note.description}</td>
                  <td>
                    <button className='bg-red-300 shadow-lg px-2' onClick={() => this.deleteClick(note.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>



        </div>
       
      </div>
    );
  }
  
  
 

}
export default App;