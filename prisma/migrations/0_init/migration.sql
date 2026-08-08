Loaded Prisma config from prisma.config.ts.
System.Management.Automation.RemoteException
Error: 
`--to-schema-datamodel` was removed. Please use `--[from/to]-schema` instead.
System.Management.Automation.RemoteException
Usage
System.Management.Automation.RemoteException
  $ prisma migrate diff [options]
System.Management.Automation.RemoteException
Options
System.Management.Automation.RemoteException
  -h, --help               Display this help message
  --config                 Custom path to your Prisma config file
  -o, --output             Writes to a file instead of stdout
System.Management.Automation.RemoteException
From and To inputs (1 `--from-...` and 1 `--to-...` must be provided):
  --from-empty             Flag to assume from or to is an empty datamodel
  --to-empty
System.Management.Automation.RemoteException
  --from-schema            Path to a Prisma schema file, uses the datamodel for the diff
  --to-schema
System.Management.Automation.RemoteException
  --from-migrations        Path to the Prisma Migrate migrations directory
  --to-migrations
System.Management.Automation.RemoteException
  --from-config-datasource Flag to use the datasource from the Prisma config file
  --to-config-datasource
System.Management.Automation.RemoteException
Flags
System.Management.Automation.RemoteException
  --script                 Render a SQL script to stdout instead of the default human readable summary (not supported on MongoDB)
  --exit-code              Change the exit code behavior to signal if the diff is empty or not (Empty: 0, Error: 1, Not empty: 2). Default behavior is Success: 0, Error: 1.
System.Management.Automation.RemoteException
