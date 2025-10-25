export function getTypeOptions(type) {
    const options = [
        { value: 'Inner', title: 'Inner' },
        { value: 'Outer', title: 'Outer' },
        { value: 'Dwarf', title: 'Dwarf' },
    ];

    const result = options.map(option => ({ ...option, selected: type === option.value ? 'selected' : '' }));

    return result;
}

export function getRingsOptions(rings) {
    const options = [
        { value: 'Yes', title: 'Yes' },
        { value: 'No', title: 'No' },
    ];

    const result = options.map(option => ({ ...option, selected: rings === option.value ? 'selected' : '' }));

    return result;
}