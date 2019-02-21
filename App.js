import React, { Component } from 'react';
import { View, StyleSheet}  from 'react-native';
import { Container, Icon, Button, Form, Item, Label, Input, Text} from 'native-base';
import ActionButton from 'react-native-action-button';
import { Calendar } from 'react-native-calendars';
import Modal from 'react-native-modal';

export default class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       visibleModal : null,
    };
  };
  
  renderButton = (text, onPress) => (
    <Button style={styles.button} block onPress={onPress}>
      <Text>{text}</Text>
    </Button>
  );

  renderModalContent = () => (
    <View style={styles.modalContent}>
      <Form>
        <Item>
          <Label>Event Name</Label>
          <Input />
        </Item>
        <Item>
          <Label>Description</Label>
          <Input />
        </Item>
      </Form>
      {this.renderButton("Close", () => this.setState({ visibleModal: null }))}
    </View>
  );

  render() {
    return (
      <Container style={{flex: 1}}>
        <Modal isVisible={this.state.visibleModal === 1}>
          {this.renderModalContent()}
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
})