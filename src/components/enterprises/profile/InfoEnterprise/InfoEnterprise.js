import React from "react";
import moment from "moment";
import location from "moment/locale/es"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faLocation, faUser, faMailBulk, faMap} from "@fortawesome/free-solid-svg-icons"
import {BirthdateIcon} from "../../../../utils/icons";

import "./InfoEnterprise.scss"

export default function InfoEnterprise(props){
    const { enterprise } = props;

    return(
        <div className="info-enterprise">
            <h2 className="name">
                { enterprise.name }
            </h2>

            <p className="email">
                <FontAwesomeIcon icon={faMailBulk} />
                { enterprise.email }
            </p>

            { enterprise.address &&
                <div className="address">
                    { enterprise.address }
                </div>
            }

            <div className="more-info">
                {  enterprise.rut &&
                    <p className="">
                        <FontAwesomeIcon icon={faUser} />
                        RUT {  enterprise.rut }
                    </p>
                }

                { enterprise.address &&
                    <p className="">
                        <FontAwesomeIcon icon={faLocation} />
                        { enterprise.address }
                    </p>
                }

                { enterprise.subdomain &&
                    <p className="">
                        <FontAwesomeIcon icon={faMap} />
                        { enterprise.subdomain }
                    </p>
                }

                { enterprise.created_at &&
                    <p className="">
                        <BirthdateIcon />
                        { moment(enterprise.created_at).locale("es", location).format("LL") }
                    </p>
                }
            </div>
        </div>
    )
}
