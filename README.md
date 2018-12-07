### [Live Link Here!](https://serpient.github.io/form-creator/)

## Introduction
This form-creator was parsed from where it was originally written (Chingu repo) so it's easier to see its function. Originally written in August 2018, first draft of the form-creator.

## Load up
```
git clone https://github.com/serpient/form-creator.git
npm install
npm start
# navigate to either `/` or `/checkin` for form examples
```
## Current Question Types
- checkbox
- input
- radio
- dorpdown
- dropdown-multiple
- textarea
- checkbox-2-column
- radio-special-badge
- button-3-colors
* additional custom question types can be added

## Using Form Creator
### Example of array of question objects that the formCreator function takes
```
const weeklyCheckinData = [
    {
        id: 300,
        type: 'button-3-colors',
        question: "How would you rate your team's progress right now?",
        answers: [
            {answer: 'Great!', value: 'green', color: '$health-green'}, 
            {answer: 'Nervous', value: 'yellow', color: '$health-yellow'}, 
            {answer: 'Trouble Ahead!', value: 'red', color: '$health-red'}, 
        ]
    },
    {
        id: 301,
        type: 'textarea',
        question: 'How did you help push your team forward last week?',
    },
]

```
### Set up React Component
- React state needs to have keys that match the ids of each question object
```
 this.state = {
      300: '',
      301: '',
    }
  }
```
- onFormChange function, like below:
```
toggleValueInSet = (set, value) => {
    set.has(value) ? set.delete(value) : set.add(value);
    return set;
}
  
onFormChange = (e) => {
    const { name, value, type } = e.currentTarget;
    switch (type) {
      case 'checkbox':
        this.setState({ [name]: this.toggleValueInSet(this.state[name], value) });
        break;
      default:
        this.setState({ [name]: value });
        break;
    }
  }

```
- you need to add your own submitFunction and corresponding error/success cases. 

### Call renderQAs function within the render function
```
render() {
    return (
      <React.Fragment>
          {renderQAs(weeklyCheckinData, this.onFormChange, this.state)}
          <button onClick={e => this.submit(e)} className="weekly-checkin-btn">Submit</button>
      </React.Fragment>
    )
}
```
