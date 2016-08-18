DROP TABLE IF EXISTS Test;
CREATE TABLE [dbo].[Test] (
    [deviceId~2]    NVARCHAR (10)   NOT NULL,
    [latitude]      DECIMAL (10, 6) NOT NULL,
    [longitude]     DECIMAL (10, 6) NOT NULL,
    [speed~1]       DECIMAL(5, 2)  NOT NULL,
    [reliability~4] DECIMAL(1)   NOT NULL,
    [satellite]     DECIMAL(1)   NOT NULL,
    [type~4]        DECIMAL(1)   NOT NULL,
    [lock~4]        DECIMAL(1)             NOT NULL,
    [isoDate~9]     DATETIME2 (7)   NOT NULL
);
