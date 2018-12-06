import * as React from 'react';
import {
  answerCreator_checkbox,
  answerCreator_input,
  answerCreator_radio,
  answerCreator_dropdown,
  answerCreator_dropdown_multiple,
  answerCreator_textarea,
  answerCreator_checkbox_2_column,
  answerCreator_radio_special_badge,
  answerCreator_btn_3_options,
} from './answerTypes';

export function renderQAs(applicationData, onFormChange, state) {
  return applicationData.map((setOfQuestionAnswer) => {
    let answerComponent;
    switch (setOfQuestionAnswer.type) {
      case 'checkbox':
        answerComponent = answerCreator_checkbox;
        break;
      case 'input':
        answerComponent = answerCreator_input;
        break;
      case 'radio':
        answerComponent = answerCreator_radio;
        break;
      case 'dropdown':
        answerComponent = answerCreator_dropdown;
        break;
      case 'dropdown-multiple':
        answerComponent = answerCreator_dropdown_multiple;
        break;
      case 'textarea':
        answerComponent = answerCreator_textarea;
        break;
      case 'checkbox-2-column':
        answerComponent = answerCreator_checkbox_2_column;
        break;
      case 'radio-special-badge':
        answerComponent = answerCreator_radio_special_badge;
        break;
      case 'button-3-colors':
        answerComponent = answerCreator_btn_3_options;
        break;
      default:
        break;
    }
    const { id, question, subtext } = setOfQuestionAnswer;
    return (
      <div key={`question_${id}`} className="voyage-application-QA">
        <label className="voyage-application-question">
          {question}
        </label>
        {subtext && <div className="voyage-application-subtext">{subtext}</div>}
        {answerComponent(setOfQuestionAnswer, onFormChange, state)}
      </div>
    )
  })
}