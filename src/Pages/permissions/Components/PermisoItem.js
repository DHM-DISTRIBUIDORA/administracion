import React from "react"
import { Switch } from 'react-native'
import { SText, SView } from "servisofts-component"

const PermisoItem = ({ name, status, onPress }) => {
    return <SView col={"xs-12"} padding={4}>
        <SView col={"xs-12"} card padding={4} row center onPress={onPress}>
            <SView flex>
                <SText bold>{name}</SText>
                <SText fontSize={12}>{status}</SText>
            </SView>
            {!status ? null : <Switch value={status == "granted"} onValueChange={onPress} />}
        </SView>
    </SView>
}


export default PermisoItem