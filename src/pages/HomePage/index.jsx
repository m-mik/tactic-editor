import React from 'react';
import { Paper } from 'material-ui';
import styles from './HomePage.scss';

const HomePage = () => (
  <section>
    <Paper className={styles.content} zDepth={3}>
      <h1>Tactic Edtitor</h1>
      <h4>A tool that allows you to create pre-match football tactics and summaries of already
        completed games, and convert them to PNG images</h4>
      <img className={styles.img} src="https://user-images.githubusercontent.com/25752752/118730733-59d8ec80-b838-11eb-97ea-89c5ea6b2694.gif" alt="Demo" />
      <h3>Key Features</h3>
      <ul>
        <li>
          Tactic list
          <ul>
            <li>Create, edit, delete and save tactics to localStorage</li>
            <li>Clone the selected tactic</li>
          </ul>
        </li>
        <li>
          Tactic settings
          <ul>
            <li>Change tactic name</li>
            <li>Toggle tactic visibility options</li>
          </ul>
        </li>
        <li>
          Match summary
          <ul>
            <li>Calculate match score based on the teams&apos; goals</li>
            <li>Display match events according to players&apos; data</li>
          </ul>
        </li>
        <li>
          Teams
          <ul>
            <li>Edit team names, colors and shirt styles</li>
          </ul>
        </li>
        <li>
          Team formation
          <ul>
            <li>Use predefined formations or create your own</li>
            <li>Move players on the field to new positions</li>
            <li>Swap players with other players from the same team</li>
          </ul>
        </li>
        <li>
          Team bench
          <ul>
            <li>Make substitutions by dragging a bench player and dropping it on a field player</li>
            <li>Add, remove and edit players on the bench</li>
          </ul>
        </li>
        <li>
          Players
          <ul>
            <li>Manage player&apos;s data, including: name, shirt number, match rating, goals,
              own goals, assists, yellow cards, red cards
            </li>
          </ul>
        </li>
        <li>
          Tactic image generation
          <ul>
            <li>Generate PNG images from the currently selected tactic</li>
          </ul>
        </li>
      </ul>
    </Paper>
  </section>
);

export default HomePage;
