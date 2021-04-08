import './App.css';
import {useState, useEffect} from 'react';
const App = () => {
  const [animals, setAnimals] = useState([]);
  const [animalID, setAnimalID] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    age: 0,
    sound: ''
  });
  const [updateData, setUpdateData] = useState({
    name: '',
    type: '',
    age: 0,
    sound: ''
  });
  const getAnimals = () => {
    fetch('http://localhost:3001/animal/all')
    .then(res => res.json())
    .then(res => setAnimals(res.data));
  }
  useEffect(() => {
    getAnimals();
  }, []);
  const deleteAnimal = async (id) => {
    let res = await fetch(`http://localhost:3001/animal/delete/${id}`, {
      method: 'DELETE'
    });
    res = await res.json();
    console.log(res);
    let newAnimals = animals.filter(animal => animal._id !== id);
    setAnimals(newAnimals);
  }
  const updateAnimal = async() => {
    let res = await fetch(`http://localhost:3001/animal/update/${animalID}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(updateData)
    });
    console.log(await res.json());
  }
  const showAnimals = () => {
    if (!animals) {
      return (
        <h2>No animals found</h2>
      )
    }
    return (
      animals.map((animal, i) => (
        <div key={i}>
          <p>name: {animal.name}</p>
          <p>type: {animal.type}</p>
          <p>age: {animal.age}</p>
          <p>sound: {animal.sound}</p>
          <button onClick={() => {deleteAnimal(animal._id)}}>Delete</button>
          <button onClick= {() => {setAnimalID(animal._id)}}>Update</button>
          <hr/>
        </div>
      ))
    )
  };
  const handleInputChange = (event) => {
    let newObj = {
      name: formData.name,
      type: formData.type,
      age: formData.age,
      sound: formData.sound,
    }
    newObj[event.target.name] = event.target.value;
    setFormData(newObj);
  }
  const handleUpdateChange = (event) => {
    let newObj = {
      name: updateData.name,
      type: updateData.type,
      age: updateData.age,
      sound: updateData.sound,
    }
    newObj[event.target.name] = event.target.value;
    setUpdateData(newObj);
  }
  const createAnimal = async(event) => {
    event.preventDefault();
    let res = await fetch('http://localhost:3001/animal/create',{
      method: 'POST',
      mode: 'cors',
      headers: {
      'content-type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    console.log(await res.json());
  }
  return(
    <>
      <h2>Create animal</h2>
      <form onSubmit={createAnimal}>
        name: <input type='text' name='name' value={formData.name} onChange={handleInputChange}/>
        <br/>
        type: <input type='text' name='type' value={formData.type} onChange={handleInputChange}/>
        <br/>
        age: <input type='number' name='age' value={formData.age} onChange={handleInputChange}/>
        <br/>
        sound: <input type='text' name='sound' value={formData.sound} onChange={handleInputChange}/>
        <br/>
        <input type='submit'/>
      </form>
      <h2>Update Animal</h2>
      <form onSubmit={() => {updateAnimal()}}>
        name: <input type='text' name='name' value={updateData.name} onChange={handleUpdateChange}/>
        <br/>
        type: <input type='text' name='type' value={updateData.type} onChange={handleUpdateChange}/>
        <br/>
        age: <input type='number' name='age' value={updateData.age} onChange={handleUpdateChange}/>
        <br/>
        sound: <input type='text' name='sound' value={updateData.sound} onChange={handleUpdateChange}/>
        <br/>
        <input type='submit'/>
      </form>
      {showAnimals()}
    </>
  );
}
export default App;