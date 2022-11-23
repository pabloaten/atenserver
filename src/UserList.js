import React, { useEffect, useState } from 'react'
import { List, SimpleList, Datagrid, TextField, EmailField, UrlField } from "react-admin";
import axios from "axios"

const UserList = () => {
    /* const [pokemon, setPokemon] = useState([])
    useEffect(() => {
      axios.get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0').then(function (response) {
        setPokemon(response.results)
      })
    }, []) */
    
  return (
    <List>
    <Datagrid rowClick="edit">
      <TextField source="name" />
     {/*  <TextField source="name" />
      <TextField source="username" />
      <EmailField source="email" />
      <TextField source="address.street" />
      <TextField source="phone" />
      <TextField source="website" />
      <TextField source="company.name" /> */}
    </Datagrid>
  </List>
  )
}

export default UserList