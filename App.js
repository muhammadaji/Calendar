import React, { Component } from 'react';
import { View, StyleSheet}  from 'react-native';
import { Container, Icon, Button, Form, Item, Label, Input, Text, DatePicker} from 'native-base';
import ActionButton from 'react-native-action-button';
import { Calendar } from 'react-native-calendars';
import Modal from 'react-native-modal';

export default class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       visibleModal : null,
       choosenDate : new Date()
    };
  };
  
  setDate = (newDate) => {
    this.setState({choosenDate: newDate})
  }

  renderButton = (text, onPress, style) => (
    <Button style={style} block onPress={onPress}>
      <Text>{text}</Text>
    </Button>
  );

  renderModalCreate = () => (
    <View style={styles.modalContent}>
      <Form>
        <Item >
          <Input placeholder="Event Name" />
        </Item>
        <Item >
          <Input placeholder="Event Description" />
        </Item>
      </Form>
      <View style={styles.selectDate}>
        <Text>Date : </Text>
        <DatePicker 
          animationType={"slide"}
          onDateChange={(newDate) => this.setDate(newDate)}
          placeHolderText="Select Date"
          placeHolderTextStyle={{ color: "teal"}}
          textStyle={{ color: "teal"}}
        />
      </View>
      {this.renderButton("Add", () => console.log(this.state.choosenDate), styles.button)}
      {this.renderButton("Close", () => this.setState({ visibleModal: null }), styles.backButton)}
    </View>
  );

  render() {
    return (
      <Container style={{flex: 1}}>
        <Modal isVisible={this.state.visibleModal === 1}>
          {this.renderModalCreate()}
        </Modal>
        <Calendar/>
        <ActionButton
          buttonColor="#209fd5"
          position="right"
          renderIcon={active => <Icon style={{color: 'white', fontSize: 26}} name='md-add'/>}
          onPress = {() => this.setState({visibleModal: 1})}
        />
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: "white",
    justifyContent: 'center',
    borderRadius: 4,
    padding: 10,
  },
  button: {
    marginTop: 10
  },
  backButton: {
    marginTop: 10,
    backgroundColor: 'red'
  },
  selectDate: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})