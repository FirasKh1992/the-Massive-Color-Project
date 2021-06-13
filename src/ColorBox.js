import React, { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';

import { withStyles } from "@material-ui/styles";
import styles from './styles/ColorBoxStyles'
import classNames from 'classnames';




function ColorBox(props) {
    const [copied, setCopied] = useState(false);
    const { name, background, MoreURL, showingFullPalette, classes } = props;
    const {//classes
        colorBox,
        showOverlay,
        copyOverlay,
        copyMessage,
        showMessage,
        copyText,
        boxContent,
        colorName,
        copyButton,
        seeMore
    } = classes;

    const changeCopyState = () => {
        setCopied(true)
        setTimeout(() =>
            setCopied(false), 1500)

    }


    return (

        <CopyToClipboard text={background} onCopy={changeCopyState}>
            <div style={{ background }} className={colorBox}>
                <div
                    style={{ background }}
                    className={classNames(copyOverlay, {
                        [showOverlay]: copied
                    })}

                />
                <div className={classNames(copyMessage, {
                    [showMessage]: copied
                })} >
                    <h1>COPIED!</h1>
                    <p className={copyText} >{background}</p>
                </div>
                <div >
                    <div className={boxContent}>
                        <span className={colorName} >{name} </span>
                    </div>
                    <button className={copyButton}>Copy</button>
                </div>
                {showingFullPalette &&
                    <Link to={MoreURL} onClick={e => e.stopPropagation(e)}>
                        <span className={seeMore} >MORE </span>
                    </Link>
                }
            </div>
        </CopyToClipboard>

    )
}
export default withStyles(styles)(ColorBox);