/**
 * Created by hugo.queiros on 04/07/16.
 */
import React from 'react'
import {storiesOf, action} from '@kadira/storyboook'
import ReactDOM from 'react-dom';

storiesOf('Button', module)
    .add('with text', ()=> (
        <button onClick={action('clicked')}>My button text</button>
    ))
    .add('without text', ()=> {
        <button></button>
    })

