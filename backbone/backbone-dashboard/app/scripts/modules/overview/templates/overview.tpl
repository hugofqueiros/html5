<div class="container-fluid container-module">
    <div class="row">
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6" id="realtimeCard">
            <div class="card" elevation="1">
                <header class="card-header">
                    <div class="card-header-icon fa fa-street-view">
                    </div>
                    <div class="card-header-title">
                        Real-time Visits
                    </div>
                </header>
                <section class="card-body card-body-realtime">
                    <div class="card-body-values card-body-value-realtime-number">
                        <%= data.value[0] %>
                    </div>
                    <div class="card-body-values card-body-value-realtime-date">
                        <%= data.value[1] %>
                    </div>
                </section>
            </div>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        </div>
        <div class="col-md-12 col-lg-12" id="overviewChart">
            <div class="card" elevation="1">
                <header class="card-header">
                    <div class="card-header-icon fa fa-street-view">
                    </div>
                    <div class="card-header-title">
                        Real-time Chart Visits
                    </div>
                </header>
                <section class="card-body">
                    <div class="chart"></div>
                </section>
            </div>
        </div>
    </div>
</div>
