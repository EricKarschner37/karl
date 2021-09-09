import { useState } from 'react';
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup } from '@material-ui/core';

const RadioSelect = (props) => {
  const elems = props.values.map((value) => (
    <FormControlLabel key = {value.toLowerCase()} value={value.toLowerCase()} label={value} control={<Radio />} />
  ))
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{props.label}</FormLabel>
      <RadioGroup aria-label={props.label.toLowerCase()} name={props.label.toLowerCase()} value={props.value} onChange={props.handleChange}>
        {elems}
      </RadioGroup>
    </FormControl>
  )
}

const CheckboxSelect = (props) => {
  const elems = props.values.map((value) => (
    <FormControlLabel key={value.toLowerCase()}
      control={
        <Checkbox checked={props.selected.has(value.toLowerCase())} onChange={props.handleChange} name={props.label.toLowerCase()} value={value.toLowerCase()}/>}
      label={value}
    />
  ))

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{props.label}</FormLabel>
      <FormGroup>
        {elems}
      </FormGroup>
    </FormControl>
  )
}

const OrderForm = () => {
  const [temp, setTemp] = useState('');
  const [syrups, setSyrups] = useState(new Set());
  const [milk, setMilk] = useState('');

  const syrupChoices = ["Mocha", "Caramel", "Mint", "Blackberry", "Maple", "Peanut Butter", "Brown Sugar"]

  const handleSyrupChange = (syrup) => {
    if (syrups.has(syrup)) {
      syrups.delete(syrup)
      setSyrups(new Set(syrups))
    } else {
      syrups.add(syrup)
      setSyrups(new Set(syrups))
    }
  }

  const handleSubmit = () => {
    let data = {};
    data.milk = milk;
    data.temperature = temp;
    data.flavors = Array.from(syrups);
    console.log(JSON.stringify(data))
    fetch(`${process.env.REACT_APP_BACKEND_URL}/order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error('Error:', error))
  }

  return (
    <>
      <RadioSelect label="Temperature" values={["Hot", "Iced"]} value={temp} handleChange={(e) => setTemp(e.target.value)}/>
      <CheckboxSelect label="Flavors" values={syrupChoices} selected={syrups} handleChange={(e) => handleSyrupChange(e.target.value)}/>
      <RadioSelect label="Milk" values={["Oat", "Whole"]} value={milk} handleChange={(e) => setMilk(e.target.value)}/>
      <br/>
      <br/>
      <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
    </>
  )
}

export default OrderForm;
