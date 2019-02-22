import React, { Component } from 'react';
import { View, StyleSheet}  from 'react-native';
import { Container, Icon, Button, Form, Item, Label, Input, Text, DatePicker} from 'native-base';
import ActionButton from 'react-native-action-button';
import { Calendar } from 'react-native-calendars';
import Modal from 'react-native-modal';
import moment from 'moment';
import _ from 'lodash';

export default class App extends Component {
  
  constructor(props) {
    super(props)
  
    this.state = {
       visibleModal : null,
       choosenDate : '',
       eventName : "",
       eventDesc : "",
       markedDates : []
    };
  };
  
  _markedDates = () => {
    var Date = _.keyBy(this.state.markedDates, data => data.date);
    return Date;
  }

  setEvent = () => {
    var setDate = {
      date: this.state.choosenDate,
      selected: true,
      eventName: this.state.eventName,
      eventDesc: this.state.eventDesc
    }
    this.state.markedDates.push(setDate);
    this.setState({visibleModal: null});
  }

  setDate = (newDate) => {
    this.setState({choosenDate: moment(newDate).format('YYYY-MM-DD')})
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
          <Input placeholder="Event Name" onChangeText={(text) => this.setState({eventName: text})} />
        </Item>
        <Item >
          <Input placeholder="Event Description" onChangeText={(text) => this.setState({eventDesc: text})}/>
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
          formatChosenDate={date => {return moment(date).format('YYYY-MM-DD');}}
      />
      </View>
      {this.renderButton("Add", () => this.setEvent(), styles.button)}
      {this.renderButton("Close", () => this.setState({ visibleModal: null }), styles.backButton)}
    </View>
  );

  render() {
    return (
      <Container style={{flex: 1}}>
        <Modal isVisible={this.state.visibleModal === 1}>
          {this.renderModalCreate()}
        </Modal>
        <Calendar
          markedDates={this._markedDates()}
        />
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