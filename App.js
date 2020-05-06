import React from 'react';
import { StyleSheet,Button, ScrollView, View, Switch, StatusBar, Alert, Dimensions } from 'react-native';
import {Text} from 'react-native-elements'
import Constants from 'expo-constants'


export class Todo extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      pending: 'Pending',
      id: props.id,
    }
  }

  render(){
    return (
      <View style={{flexDirection:"column", alignItems:"center", justifyContent:"space-around"}}>
        <Text h1>{this.props.title}</Text>
        <View style={{flexDirection:"row", alignItems:"center"}}>
          <Text class={"status_text"}>{this.state.pending}</Text>
          <Button title="Clear!" onPress={() => this.clearTask(this.state.id)}/>
        </View>
      </View>
    )
  }

  clearTask(evt){
    this.setState({
      pending: 'Done!',
      id: this.state.id,
    })
  }
}



const TaskList = (props) => (
  <ScrollView>
    {props.tasks.map((task) => <Todo title={task.title} id={task.id}/>)}
  </ScrollView>
)

export default class App extends React.Component {
  constructor(){
    super()
    this.state = {
      todos: [],
      nextTask: 1,
    }
  }

  addTask() {
    Alert.prompt('Add a Task',
                 '', 
                 (text)=> 
                   this.setState(
                     {
                      todos:[
                        ...this.state.todos,
                        {
                          title: text,
                          id:this.state.nextTask++,
                        }
                        ],
                      }
                      )
                    
                    )

  }

  render() {
  return (
    <View style={{paddingTop: Constants.statusBarHeight}}>
      <Text h1 style={{textAlign:'center'}}>TODO!</Text>
      <View style={{borderBottomWidth:2,borderBottomColor:'black', marginBottom:20}}>
        <Button onPress={() => this.addTask()} title="Add a Task!"/>
      </View>
      <TaskList tasks={this.state.todos}/>
    </View>
    )
  }
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  task: {
    flexDirection: "row",
    alignItems:'center',
    padding: 5,
    margin: 20,
    borderWidth: 2
  }
});
