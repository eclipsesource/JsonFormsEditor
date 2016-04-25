module app.core {
    export class StaticConfig{

        // 'app.dialogs' -> select components for the schema loader wizard
        static config = {"app.dialogs": [
                "app.dialogs.empty",
                "app.dialogs.upload",
                "app.dialogs.github",
                "app.dialogs.url"
            ]
        }
    }
}
