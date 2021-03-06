/*
 * Copyright 2015 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */

import { Classes, H5, Switch } from "@blueprintjs/core";
import { Example, handleNumberChange, IExampleProps } from "@blueprintjs/docs-theme";
import * as React from "react";
import { PrecisionSelect } from "./common/precisionSelect";

import { TimePicker, TimePickerPrecision } from "@blueprintjs/datetime";
// tslint:disable-next-line:no-submodule-imports
import { getDefaultMaxTime, getDefaultMinTime } from "@blueprintjs/datetime/lib/esm/common/timeUnit";

export interface ITimePickerExampleState {
    precision?: TimePickerPrecision;
    selectAllOnFocus?: boolean;
    showArrowButtons?: boolean;
    disabled?: boolean;
    minTime?: Date;
    maxTime?: Date;
    useAmPm?: boolean;
}

enum MinimumHours {
    NONE = 0,
    SIX_PM = 18,
}

enum MaximumHours {
    NONE = 0,
    SIX_PM = 18,
    NINE_PM = 21,
    TWO_AM = 2,
}

export class TimePickerExample extends React.PureComponent<IExampleProps, ITimePickerExampleState> {
    public state = {
        disabled: false,
        precision: TimePickerPrecision.MINUTE,
        selectAllOnFocus: false,
        showArrowButtons: false,
        useAmPm: false,
    };

    private handlePrecisionChange = handleNumberChange(precision => this.setState({ precision }));

    public render() {
        return (
            <Example options={this.renderOptions()} {...this.props}>
                <TimePicker {...this.state} />
            </Example>
        );
    }

    protected renderOptions() {
        return (
            <>
                <H5>Props</H5>
                <Switch
                    checked={this.state.selectAllOnFocus}
                    label="Select all on focus"
                    onChange={this.toggleSelectAllOnFocus}
                />
                <Switch
                    checked={this.state.showArrowButtons}
                    label="Show arrow buttons"
                    onChange={this.toggleShowArrowButtons}
                />
                <Switch checked={this.state.disabled} label="Disabled" onChange={this.toggleDisabled} />
                <Switch checked={this.state.useAmPm} label="Use AM/PM" onChange={this.toggleUseAmPm} />
                <PrecisionSelect value={this.state.precision} onChange={this.handlePrecisionChange} />
                <label className={Classes.LABEL}>
                    Minimum time
                    <div className={Classes.SELECT}>
                        <select onChange={handleNumberChange(this.changeMinHour)}>
                            <option value={MinimumHours.NONE}>None</option>
                            <option value={MinimumHours.SIX_PM}>6pm (18:00)</option>
                        </select>
                    </div>
                </label>
                <label className={Classes.LABEL}>
                    Maximum time
                    <div className={Classes.SELECT}>
                        <select onChange={handleNumberChange(this.changeMaxHour)}>
                            <option value={MaximumHours.NONE}>None</option>
                            <option value={MaximumHours.SIX_PM}>6pm (18:00)</option>
                            <option value={MaximumHours.NINE_PM}>9pm (21:00)</option>
                            <option value={MaximumHours.TWO_AM}>2am (02:00)</option>
                        </select>
                    </div>
                </label>
            </>
        );
    }

    private toggleShowArrowButtons = () => {
        this.setState({ showArrowButtons: !this.state.showArrowButtons });
    };

    private toggleSelectAllOnFocus = () => {
        this.setState({ selectAllOnFocus: !this.state.selectAllOnFocus });
    };

    private toggleDisabled = () => {
        this.setState({ disabled: !this.state.disabled });
    };

    private toggleUseAmPm = () => {
        this.setState({ useAmPm: !this.state.useAmPm });
    };

    private changeMinHour = (hour: MinimumHours) => {
        let minTime = new Date(1995, 6, 30, hour);

        if (hour === MinimumHours.NONE) {
            minTime = getDefaultMinTime();
        }

        this.setState({ minTime });
    };

    private changeMaxHour = (hour: MaximumHours) => {
        let maxTime = new Date(1995, 6, 30, hour);

        if (hour === MaximumHours.NONE) {
            maxTime = getDefaultMaxTime();
        }

        this.setState({ maxTime });
    };
}
