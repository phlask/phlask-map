import React from "react";
import styles from "./Pages.module.scss";
import Head from "../Head/Head";

const Mission = () => {
  return (
    <>
      <div className={styles.pageText}>
        <h2>Mission</h2>
        <p className={styles.blockquote}>
          PHLASK: a pun on the word ‘flask’ to also symbolize Philadelphia (PHL)
          + Ask; to ‘phlask’ for water
        </p>
        <p>
          The PHLASK mission is simple: expand accessibility to water and reduce
          waste associated with distribution.
        </p>
        <p>
          Water should remain abundant, clean and accessible to everyone.
          PHLASK&apos;s mission is to help people find publicly available sources of
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
        <h3>How to PHLASK</h3>
        <p>
          PHLASKing is simple. Look on the PHLASK Map for the nearest accessible
          tap and go fill up your vessel.
        </p>
        <h4>Public tap</h4>
        <p>
          Fill up and enjoy the benefits of our taxes serving our basic human
          needs!
        </p>
        <h4>Private tap</h4>
        <p>
          Follow the instructions on the PHLASK MAP given by the proprietor for
          how they’ve accommodated sharing water.
        </p>
        <h4>Sharing water</h4>
        <p>
          Let us know you’d like to share access to your water tap! Just fill
          out the form and provide some simple instructions for PHLASKers to
          know how they can politely and unobtrusively access your tap.
        </p>

        <h3>Is it too much to PHLASK for?</h3>
        <p>
          Private taps are affixed in a variety of locations, and can incur
          varying degrees of intrusion upon the proprietor to share. While
          respecting the relative inconvenience of providing access, we have
          faith that proprietors who ideologically agree with the mission would
          be willing to sustain the minor inconvenience for the greater good of
          sharing water and reducing waste. The Philadelphia Water Department
          charges half a cent per gallon; the cost of filling up a typical 16 fl
          oz. water bottle, or PHLASK Bottle, is only 1/14 of a cent.
        </p>
      </div>
    </>
  );
};

export default Mission;
