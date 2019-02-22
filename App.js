import React, { Component } from 'react';
import { View, StyleSheet}  from 'react-native';
import { Container, Icon, Button, Form, Item, Input, DatePicker, Text} from 'native-base';
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
       markedDates : [],
       selectedDate: {}
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
      eventDesc: this.state.eventDesc,
      customStyles: {
        container: {
          backgroundColor: '#209fd5',
          elevation: 7
        },
        text: {
          color: 'white'
        }
      }
    }
    this.state.markedDates.push(setDate);
    this.setState({visibleModal: null});
  }

  setDate = (newDate) => {
    this.setState({choosenDate: moment(newDate).format('YYYY-MM-DD')});
  }

  modalView = (day) => {
    var selectDate = _.find(this.state.markedDates, {"date": day.dateString});
    if (selectDate !== undefined) {
      this.setState({selectedDate: selectDate, visibleModal: 2})
    }else{
      this.setState({visibleModal: 3})
    }
  }

  renderButton = (text, onPress, style) => (
    <Button style={style} block onPress={onPress}>
      <Text>{text}</Text>
    </Button>
  );
  
  renderModalView = () => (
      <View style={styles.modalContent}>
        <View style={{flexDirection: 'row'}}>
          <Text>Event Name : </Text>
          <Text style={{flex: 1, flexWrap: 'wrap'}}>{this.state.selectedDate.eventName}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text>Description : </Text>
          <Text style={{flex: 1, flexWrap: 'wrap'}}>{this.state.selectedDate.eventDesc}</Text>
        </View>
        {this.renderButton("Close", () => this.setState({visibleModal: null}), styles.backButton)}
      </View>
  )

  renderModalNoEvent = () => (
    <View style={styles.modalContent}>
      <Text style={styles.noEventText}>No Event Created</Text>
      {this.renderButton("Close", () => this.setState({visibleModal: null}), styles.backButton)}
    </View>
  )

  renderModalCreate = () => (
    <View style={styles.modalContent}>
      <Form>
        <Item >
          <Input placeholderTextColor="black" placeholder="Event Name" onChangeText={(text) => this.setState({eventName: text})} />
        </Item>
        <Item >
          <Input placeholderTextColor="black" placeholder="Description" onChangeText={(text) => this.setState({eventDesc: text})}/>
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
        <Modal isVisible={this.state.visibleModal === 2}>
          {this.renderModalView()}        
        </Modal>
        <Modal isVisible={this.state.visibleModal === 3}>
          {this.renderModalNoEvent()}        
        </Modal>
        <Calendar
          markedDates={this._markedDates()}
          onDayPress={(day) => this.modalView(day)}
          markingType={'custom'}
        />
        <ActionButton
          buttonColor="#209fd5"
          position="right"
          renderIcon={active => <Icon style={{color: 'white', fontSize: 24}} name='md-add'/>}
          onPress = {() => this.setState({visibleModal: 1})}
          offsetX={15}
          offsetY={15}
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
    alignItems: 'center',
    marginLeft: 15,
  },
  noEventText: {
    alignSelf: 'center'
  }
})