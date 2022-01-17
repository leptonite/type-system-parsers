import { EqualTypes } from '../EqualTypes';
import { IsDateString } from './IsDateString';


// first and last day of every month in 2022
{ const test: EqualTypes<IsDateString<'2022-01-01'>, true> = true; }
{ const test: EqualTypes<IsDateString<'2022-01-31'>, true> = true; }
{ const test: EqualTypes<IsDateString<'2022-02-01'>, true> = true; }
{ const test: EqualTypes<IsDateString<'2022-02-28'>, true> = true; }
{ const test: EqualTypes<IsDateString<'2022-03-01'>, true> = true; }
{ const test: EqualTypes<IsDateString<'2022-03-31'>, true> = true; }
{ const test: EqualTypes<IsDateString<'2022-04-01'>, true> = true; }
{ const test: EqualTypes<IsDateString<'2022-04-30'>, true> = true; }
{ const test: EqualTypes<IsDateString<'2022-05-01'>, true> = true; }
{ const test: EqualTypes<IsDateString<'2022-05-31'>, true> = true; }
{ const test: EqualTypes<IsDateString<'2022-06-01'>, true> = true; }
{ const test: EqualTypes<IsDateString<'2022-06-30'>, true> = true; }
{ const test: EqualTypes<IsDateString<'2022-07-01'>, true> = true; }
{ const test: EqualTypes<IsDateString<'2022-07-31'>, true> = true; }
{ const test: EqualTypes<IsDateString<'2022-08-01'>, true> = true; }
{ const test: EqualTypes<IsDateString<'2022-08-31'>, true> = true; }
{ const test: EqualTypes<IsDateString<'2022-09-01'>, true> = true; }
{ const test: EqualTypes<IsDateString<'2022-09-30'>, true> = true; }
{ const test: EqualTypes<IsDateString<'2022-10-01'>, true> = true; }
{ const test: EqualTypes<IsDateString<'2022-10-31'>, true> = true; }
{ const test: EqualTypes<IsDateString<'2022-11-01'>, true> = true; }
{ const test: EqualTypes<IsDateString<'2022-11-30'>, true> = true; }
{ const test: EqualTypes<IsDateString<'2022-12-01'>, true> = true; }
{ const test: EqualTypes<IsDateString<'2022-12-31'>, true> = true; }

// day 00 and day last+1 of every month in 2022
{ const test: EqualTypes<IsDateString<'2022-01-00'>, false> = true; }
{ const test: EqualTypes<IsDateString<'2022-01-32'>, false> = true; }
{ const test: EqualTypes<IsDateString<'2022-02-00'>, false> = true; }
{ const test: EqualTypes<IsDateString<'2022-02-29'>, false> = true; }
{ const test: EqualTypes<IsDateString<'2022-03-00'>, false> = true; }
{ const test: EqualTypes<IsDateString<'2022-03-32'>, false> = true; }
{ const test: EqualTypes<IsDateString<'2022-04-00'>, false> = true; }
{ const test: EqualTypes<IsDateString<'2022-04-31'>, false> = true; }
{ const test: EqualTypes<IsDateString<'2022-05-00'>, false> = true; }
{ const test: EqualTypes<IsDateString<'2022-05-32'>, false> = true; }
{ const test: EqualTypes<IsDateString<'2022-06-00'>, false> = true; }
{ const test: EqualTypes<IsDateString<'2022-06-31'>, false> = true; }
{ const test: EqualTypes<IsDateString<'2022-07-00'>, false> = true; }
{ const test: EqualTypes<IsDateString<'2022-07-32'>, false> = true; }
{ const test: EqualTypes<IsDateString<'2022-08-00'>, false> = true; }
{ const test: EqualTypes<IsDateString<'2022-08-32'>, false> = true; }
{ const test: EqualTypes<IsDateString<'2022-09-00'>, false> = true; }
{ const test: EqualTypes<IsDateString<'2022-09-31'>, false> = true; }
{ const test: EqualTypes<IsDateString<'2022-10-00'>, false> = true; }
{ const test: EqualTypes<IsDateString<'2022-10-32'>, false> = true; }
{ const test: EqualTypes<IsDateString<'2022-11-00'>, false> = true; }
{ const test: EqualTypes<IsDateString<'2022-11-31'>, false> = true; }
{ const test: EqualTypes<IsDateString<'2022-12-00'>, false> = true; }
{ const test: EqualTypes<IsDateString<'2022-12-32'>, false> = true; }

// feb. 29 of leap years
{ const test: EqualTypes<IsDateString<'0000-02-29'>, true> = true; }
{ const test: EqualTypes<IsDateString<'0004-02-29'>, true> = true; }
{ const test: EqualTypes<IsDateString<'0008-02-29'>, true> = true; }
{ const test: EqualTypes<IsDateString<'0012-02-29'>, true> = true; }
{ const test: EqualTypes<IsDateString<'0096-02-29'>, true> = true; }
{ const test: EqualTypes<IsDateString<'0104-02-29'>, true> = true; }
{ const test: EqualTypes<IsDateString<'0400-02-29'>, true> = true; }
{ const test: EqualTypes<IsDateString<'0800-02-29'>, true> = true; }
{ const test: EqualTypes<IsDateString<'2000-02-29'>, true> = true; }
{ const test: EqualTypes<IsDateString<'2004-02-29'>, true> = true; }
{ const test: EqualTypes<IsDateString<'2400-02-29'>, true> = true; }

// feb. 30 of leap years
{ const test: EqualTypes<IsDateString<'0000-02-30'>, false> = true; }
{ const test: EqualTypes<IsDateString<'0004-02-30'>, false> = true; }
{ const test: EqualTypes<IsDateString<'0008-02-30'>, false> = true; }
{ const test: EqualTypes<IsDateString<'0012-02-30'>, false> = true; }
{ const test: EqualTypes<IsDateString<'0096-02-30'>, false> = true; }
{ const test: EqualTypes<IsDateString<'0104-02-30'>, false> = true; }
{ const test: EqualTypes<IsDateString<'0400-02-30'>, false> = true; }
{ const test: EqualTypes<IsDateString<'0800-02-30'>, false> = true; }
{ const test: EqualTypes<IsDateString<'2000-02-30'>, false> = true; }
{ const test: EqualTypes<IsDateString<'2004-02-30'>, false> = true; }
{ const test: EqualTypes<IsDateString<'2400-02-30'>, false> = true; }

// feb. 29 of non-leap years
{ const test: EqualTypes<IsDateString<'0001-02-29'>, false> = true; }
{ const test: EqualTypes<IsDateString<'0002-02-29'>, false> = true; }
{ const test: EqualTypes<IsDateString<'0003-02-29'>, false> = true; }
{ const test: EqualTypes<IsDateString<'0005-02-29'>, false> = true; }
{ const test: EqualTypes<IsDateString<'0100-02-29'>, false> = true; }
{ const test: EqualTypes<IsDateString<'0200-02-29'>, false> = true; }
{ const test: EqualTypes<IsDateString<'0300-02-29'>, false> = true; }
{ const test: EqualTypes<IsDateString<'1800-02-29'>, false> = true; }
{ const test: EqualTypes<IsDateString<'1900-02-29'>, false> = true; }
{ const test: EqualTypes<IsDateString<'2001-02-29'>, false> = true; }
{ const test: EqualTypes<IsDateString<'2100-02-29'>, false> = true; }
{ const test: EqualTypes<IsDateString<'2200-02-29'>, false> = true; }
{ const test: EqualTypes<IsDateString<'2300-02-29'>, false> = true; }
{ const test: EqualTypes<IsDateString<'2401-02-29'>, false> = true; }

// invalid date format
{ const test: EqualTypes<IsDateString<'x'>, false> = true; }
{ const test: EqualTypes<IsDateString<'2x'>, false> = true; }
{ const test: EqualTypes<IsDateString<'20x'>, false> = true; }
{ const test: EqualTypes<IsDateString<'200x'>, false> = true; }
{ const test: EqualTypes<IsDateString<'2000x'>, false> = true; }
{ const test: EqualTypes<IsDateString<'2000-x'>, false> = true; }
{ const test: EqualTypes<IsDateString<'2000-1x'>, false> = true; }
{ const test: EqualTypes<IsDateString<'2000-12x'>, false> = true; }
{ const test: EqualTypes<IsDateString<'2000-12-x'>, false> = true; }
{ const test: EqualTypes<IsDateString<'2000-12-3x'>, false> = true; }
{ const test: EqualTypes<IsDateString<'2000-12-31x'>, false> = true; }
{ const test: EqualTypes<IsDateString<'x2000-12-31'>, false> = true; }
