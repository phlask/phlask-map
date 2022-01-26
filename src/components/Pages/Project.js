import React from "react";
import Head from "../Head/Head";
import styles from "./Pages.module.scss";

const Project = () => {
  return (
    <>
      <div className={styles.pageText}>
        <h2>Project</h2>
        <p>
          The project was conceived as a Social Practice art project to use
          technology as an artistic medium to build social cohesion for solving
          collective sustainability issues.
        </p>
        <p>
          Recognizing that the public plumbing infrastructure can much more
          efficiently distribute water than more energy-intensive, wasteful
          distribution of single-use plastic bottles, we determined that
          encouraging users to obtain water from the public water system instead
          of single-use plastic bottles would have net-positive impacts of
          reducing waste and reducing energy consumption.
        </p>
        <p>
          While the Philadelphia Water Department maintains many public drinking
          fountains throughout the city, they are scarce when compared to the
          ubiquity of private taps at restaurants, shops, cafes, businesses and
          even people&apos;s homes. While every citizen already has the right to ask
          the proprietor to share water from their tap, this isn&apos;t a culturally
          normalized behavior. Unspoken norms of patronage and privacy, coupled
          with policies like &ldquo;restroom is for customers only,&rdquo; give the
          impression that private businesses may not be willing to share water,
          which would discourage even asking in the first place.
        </p>
        <p>
          We hope that the PHLASK project will help identify businesses that
          reject such boundaries and would like to normalize water sharing. This
          project is a conscious effort to create and normalize, what we believe
          is, a more environmentally sustainable behavior.
        </p>
      </div>
    </>
  );
};

export default Project;
