import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faPhone, faLocation, faUser, faMailBulk, faMap} from "@fortawesome/free-solid-svg-icons"
import "./InfoUser.scss"

export default function InfoUser(props){
    const { profile } = props;

    return(
        <div className="info-user">
            <h2 className="name">
                { profile?.name } { profile?.lastname }
            </h2>

            <p className="email">
                <FontAwesomeIcon icon={faMailBulk} />
                { profile?.email }
            </p>

            <div className="more-info">

                {  profile?.identifier &&
                    <p className="">
                        <FontAwesomeIcon icon={faUser} />
                        CC { profile.identifier }
                    </p>
                }

                { profile?.reference &&
                    <p className="">
                        <FontAwesomeIcon icon={faLocation} />
                        { profile.reference }
                    </p>
                }

                { profile?.phone &&
                    <p className="">
                        <FontAwesomeIcon icon={faPhone} />
                        { profile.phone }
                    </p>
                }
            </div>
            <div className="more-info">

            </div>
        </div>
    )
}
