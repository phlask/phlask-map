import React from "react";
import styles from "./Pages.module.scss";
import Head from "../Head";

const Mission = () => {
  return (
    <>
      <div className={styles.pageText}>
        <h2>Mission</h2>
        <h4>
          PHLASK: a pun on the word ‘flask’ to also symbolize Philadelphia (PHL)
          + Ask; to ‘phlask’ for water
        </h4>
        <p>
          Water should remain abundant, clean and accessible to everyone.
          PHLASK's mission is to help people find publicly available sources of
          water, and to encourage private enterprises to provide public access
          to their water infrastructure - simply by PHLasking. Single-use water
          bottles are costly and wasteful. The PHLASK Ecosystem is a simple,
          cost-effective way to reduce our dependence on single-use water
          bottles, and an efficient solution to mitigating many of the negative
          externalities of consuming single-use plastic water bottles. We hope
          to normalize water-sharing and challenge the ethics of enterprises who
          exploit public water sources and environmental sovereignty for
          profiteering.
        </p>
      </div>
    </>
  );
};

export default Mission;
