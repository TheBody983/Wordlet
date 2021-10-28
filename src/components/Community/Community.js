import React from "react";
import Contacts from "./Contacts";
import Discord from "./Discord";

const Community = () => {
    return(
        <section id="apropos">
            <div className="discord">
                    <iframe src="https://discord.com/widget?id=817218229377957938&theme=dark" width="350" height="500" allowtransparency="true" frameBorder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts" title="discord" className="card"/>
                </div>
                <ul id="contacts">
                    <li class="card"><a href="mailto:wordletthewordwallet@gmail.com" >mail</a></li>
                    <li class="card"><a href="https://discord.gg/zmRRJcVJzM">Discord</a></li>
                    <li class="card"><a href="https://www.linkedin.com/company/wordlet/">LinkedIn</a></li>
                    <li class="card"><a href="https://www.facebook.com/WordletTheWordWallet">Facebook</a></li>
                </ul>
        </section>
    )
}

export default Community