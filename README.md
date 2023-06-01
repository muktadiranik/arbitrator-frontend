# Arbitration

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Applying Permissionsss

The user api contains permissions `permissions` key which contains list of user scopes. A special structural directive is in place. In the following example, the button will be displayed only if the currently logged user has a role ‘owner’
<button \*forRoles="['owner']">+</button>
