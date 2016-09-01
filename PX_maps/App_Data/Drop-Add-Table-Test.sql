DROP TABLE IF EXISTS Data
CREATE TABLE [dbo].[Data] (
    [deviceId]    NVARCHAR (10)   NOT NULL,
    [latitude]      DECIMAL (10, 6) NOT NULL,
    [longitude]     DECIMAL (10, 6) NOT NULL,
    [speed]       DECIMAL(5, 2)  NOT NULL,
    [reliability] DECIMAL(1)   NOT NULL,
    [satellite]     DECIMAL(1)   NOT NULL,
    [type]        DECIMAL(1)   NOT NULL,
    [lock]        DECIMAL(1)             NOT NULL,
    [isoDate]     DATETIME2 (7) NOT NULL
);
