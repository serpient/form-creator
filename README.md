### [Live Link Here!](https://serpient.github.io/form-creator/)

## Introduction
This form-creator was parsed from where it was originally written ([Chingu repo](https://github.com/chingu-x/chingu-frontend/tree/master) / August 2018) so it's easier to see its function. 

## Repo setup
```
git clone https://github.com/serpient/form-creator.git
npm install
npm start
# navigate to either `/` or `/checkin` for form examples
```

## File Locations
- [formCreator function](https://github.com/serpient/form-creator/tree/master/src/components/FormCreator)
- [voyage application example](https://github.com/serpient/form-creator/tree/master/src/components/VoyageApplication)
- [weekly checkin example](https://github.com/serpient/form-creator/tree/master/src/components/WeeklyCheckin)

# Using Form Creator
### 1) Setup array of question objects (formdata)
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
### 2) Set up React Component
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

### 3) Call renderQAs function within the render function
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

### Current Question Types
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
