import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram
} from "@fortawesome/free-brands-svg-icons";

export default function ShareSocial() {
  return (
    <div className="share-social">
      <div className="share-social-item">
        <a
          className="share-social-item-link"
          href="https://www.facebook.com/sharer/sharer.php?u=http://www.baidu.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa fa-facebook-square fa-2x" aria-hidden="true"></i>
        </a>
      </div>
      <div className="share-social-item">
        <a
          className="share-social-item-link"
          href="https://twitter.com/intent/tweet?url=http://www.baidu.com&text=Hello+Baidu"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa fa-twitter-square fa-2x" aria-hidden="true"></i>
        </a>
      </div>
      <div className="share-social-item">
        <a
          className="share-social-item-link"
          href="https://plus.google.com/share?url=http://www.baidu.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa fa-google-plus-square fa-2x" aria-hidden="true"></i>
        </a>
      </div>
      <div className="share-social-item">
        <a
          className="share-social-item-link"
          href="https://www.linkedin.com/shareArticle?mini=true&url=http://www.baidu.com&title=Hello+Baidu"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa fa-linkedin-square fa-2x" aria-hidden="true"></i>
        </a>
      </div>
    </div>
  );
}
