import React, { useContext, useState, useMemo } from 'react';
import { AppContext } from '../../App';
import Course from '../../components/Course/Course';
import { Slider, Switch, Checkbox } from 'antd';
import useDebounce from '../../hook/useDebounce';
import { Container, Row, Col } from 'react-bootstrap';

const marks = {
	0: '0',
	500: '500',
	1000: {
		style: {
			color: '#f50',
		},
		label: <strong>1000</strong>,
	},
};

const CoursePage = () => {
	const context = useContext(AppContext);
	const [disabled, setDisabled] = useState(true);
	const onChange = (checked) => {
		setDisabled(checked);
	};
	const [price, setPrice] = useState(0);
	const [category, setCategory] = useState([]);

	const debounced = useDebounce(price, 500);
	const filterCourse = useMemo(() => {
		if (context.listCourse) {
			if (disabled) {
				return context.listCourse
			} else {
				if (category.length > 0 && debounced === 0) {
					return context.listCourse.filter((e) => {
						if (category.includes(e.category)) {
							return e;
						}
					});
				}
				if (debounced > 0 && category.length === 0) {
					return context.listCourse.filter((e) => {
						if (e.price <= debounced) {
							return e;
						}
					});
				}
				if (debounced > 0 && category.length > 0) {
					return context.listCourse.filter((e) => {
						if (e.price <= debounced && category.includes(e.category)) {
							return e;
						}
					});
				}
				else {
					return context.listCourse;
				}
			}
		}
	}, [disabled, debounced, category, context.listCourse]);

	const onChangeCheckBox = (checkedValues) => {
		setCategory(checkedValues);
	};

	const checkBoxGroup = useMemo(() => {
		if (context.listCategory) {
			return <Checkbox.Group options={ context.listCategory.map((e) => {
				return {
					label: e.name,
					value: e.id
				}
			}) } defaultValue={ ['Apple'] } onChange={ onChangeCheckBox } disabled={ disabled } />
		}
		return <Checkbox.Group options={ {} } defaultValue={ ['Apple'] } onChange={ onChange } />
	}, [context.listCategory, disabled])

	return (
		<>
			<Container>
				<h1>
					Sort
				</h1>
				<Row>
					<Col xs={ 12 } md={ 4 }>
						<Slider defaultValue={ 30 } marks={ marks } disabled={ disabled } range max={ 1000 } min={ 0 } step={ 10 } value={ price } onChange={ (value) => setPrice(value) } tooltip={ { open: true } } />
					</Col>
					<Col xs={ 12 } md={ 4 }>
						{
							checkBoxGroup
						}
						<Switch size="small" checked={ disabled } onChange={ onChange } />
					</Col>
				</Row>

			</Container>
			{
				filterCourse &&
				<Course listCourse={ filterCourse } />
			}
		</>
	)
}

export default CoursePage;